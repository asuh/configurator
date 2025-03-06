import { render } from 'preact';
import { useEffect } from 'preact/hooks';
import { computed, signal, effect } from '@preact/signals';
import config from './data/config.json';
import Positions from './components/Positions';
import Colors from './components/Colors';
import Materials from './components/Materials';
import type { Color, Material, dataConfig } from './types';

import './style.css';

const data = config as dataConfig;

const STORAGE_KEY = 'product_configurator';

const saveState = (state) => {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} catch (error) {
		console.error('Failed to save state to local storage', error);
	}
}

const loadInitialState = () => {
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			const { positionId: savedPositionId, materialId: savedMaterialId, colorId: savedColorId } = JSON.parse(saved);

			const position = data.Positions.find((position) => position.Position === savedPositionId);
			if (!position) return null;

			const material = position.Materials.find((material) => material.Id === savedMaterialId);
			if (!material) return { positionId: savedPositionId };

			const color = material.Colors.find((color) => color.Id === savedColorId);
			if (!color) return { positionId: savedPositionId, materialId: savedMaterialId };

			return { positionId: savedPositionId, materialId: savedMaterialId, colorId: savedColorId };
		}
	} catch (error) {
		console.error('Failed to load state from local storage', error);
	}
	return null;
}

const savedState = loadInitialState();
const positionId = signal(savedState?.positionId || data.Positions[0].Position);

const currentPosition = computed(() => {
	return data.Positions.find((position) => position.Position === positionId.value);
});

const materialId = signal(savedState?.materialId || currentPosition.value.Materials[0].Id);

const currentMaterial = computed(() => {
	return currentPosition.value.Materials.find(
		(material: Material) => material.Id === materialId.value
	);
});

const colorId = signal(savedState?.colorId || currentMaterial.value.Colors[0].Id);

const currentColor = computed(() => {
	return currentMaterial.value.Colors.find(
		(color: Color) => color.Id === colorId.value
	);
});

const modelImageSrc = computed(() => {
	return `${data.BaseImageUrl}?pos=${currentPosition.value.Position}&mat=${currentMaterial.value.Id}&col=${currentColor.value.Id}`;
});

const modelImageAlt = computed(() => {
	return `Model: Option ${currentPosition.value.Position}, Material ${currentMaterial.value.Name}, Color ${currentColor.value.Name}`;
});

export function App() {
	useEffect(() => {
		const cleanup = effect(() => {
			saveState({ 
				positionId: positionId.value,
				materialId: materialId.value,
				colorId: colorId.value
			});
		});

		return () => cleanup();
	}, []);

	const handlePositionChange = (newPosition: string) => {
		// The selected position should be a valid position
		const selectedPosition = data.Positions.find(position => {
			return position.Position === newPosition
		});

		if (!selectedPosition) {
			throw new Error("The api file is invalid");
		}

		positionId.value = newPosition;
		materialId.value = selectedPosition.Materials[0].Id;
		colorId.value = selectedPosition.Materials[0].Colors[0].Id;
	}

	const handleMaterialChange = (newMaterial: string) => {
		const selectedMaterial = currentPosition.value.Materials.find(
			(material: Material) => {
				return material.Id === newMaterial
			}
		);

		if (!selectedMaterial) return;
		
		materialId.value = newMaterial;
		colorId.value = selectedMaterial.Colors[0].Id;
	}

	const handleColorChange = (newColor: string) => {
		colorId.value = newColor;
	}

	return (
		<>
			<h1>Product Configurator</h1>
			<form class="product" action="#">
				<Positions
					positions={data.Positions}
					selectedPosition={positionId.value}
					handlePositionChange={handlePositionChange}
				/>
				<div id="product-image" class="container product-image-container">
					<img
						src={modelImageSrc.value}
						alt={modelImageAlt.value}
					/>
					{currentColor && currentPosition && currentMaterial &&
						<div class="overlays-container">
							<img 
								src={currentPosition.value.ImageUrl} 
								alt={`Position + ${currentPosition.value.Position}`} 
								class="overlay-image"
							/>
							<div
								class="overlay-color"
								style={`
											--overlay-background: url(${currentColor.value.SwatchUrl});
											--mask-image: url(${currentPosition.value.ImageUrl});
										`}
							/>
						</div>
					}
				</div>
				<Materials
					materials={currentPosition.value.Materials}
					selectedMaterial={materialId.value}
					handleMaterialChange={handleMaterialChange}
				/>
				<Colors
					colors={currentMaterial.value.Colors}
					selectedColor={colorId.value}
					handleColorChange={handleColorChange}
				/>
				<button class="submit" type="submit">Submit</button>
			</form>
		</>
	);
}

render(<App />, document.getElementById('app') as HTMLElement);
