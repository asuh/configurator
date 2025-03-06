import { render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { signal } from '@preact/signals';
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

const loadState = () => {
	try {
		const savedState = localStorage.getItem(STORAGE_KEY);
		return savedState ? JSON.parse(savedState) : null;
	} catch (error) {
		console.error('Failed to load state from local storage', error);
		return null;
	}
}

const savedState = loadState();

const positionId = signal(savedState?.positionId || data.Positions[0].Position);

export function App() {
	const currentPosition = data.Positions.find(
		(position) => position.Position === positionId.value
	);
	const [materialId, setMaterialId] = useState<string>(
		currentPosition.Materials[0].Id
	);
	const currentMaterial = currentPosition.Materials.find(
		(material: Material) => material.Id === materialId
	);
	const [colorId, setColorId] = useState<string>(
		currentMaterial.Colors[0].Id
	);
	const currentColor = currentMaterial.Colors.find(
		(color: Color) => color.Id === colorId
	);

	useEffect(() => {
		saveState({ 
			positionId: positionId.value,
			materialId,
			colorId
		});
	}, [positionId.value, materialId, colorId]);

	const handlePositionChange = (newPosition: string) => {
		// The selected position should be a valid position
		const selectedPosition = data.Positions.find(position => {
			return position.Position === newPosition
		});

		if (!selectedPosition) {
			throw new Error("The api file is invalid");
		}
		/*
		 * The selected position should also have:
		 * - one material
		 * - one color
		 */
		positionId.value = newPosition;
		const newMaterial = selectedPosition.Materials[0];
		setMaterialId(newMaterial.Id);
		setColorId(newMaterial.Colors[0].Id);
	}

	const handleMaterialChange = (newMaterial: string) => {
		const selectedMaterial = currentPosition.Materials.find(
			(material: Material) => {
				return material.Id === newMaterial
			}
		);
		if (!selectedMaterial) return;
		setMaterialId(newMaterial);
		// Reset the color to the first color available for the new material.
		setColorId(selectedMaterial.Colors[0].Id);
	}

	const handleColorChange = (newColor: string) => {
		setColorId(newColor);
	}

	const modelImageSrc = `${data.BaseImageUrl}?pos=${currentPosition.Position}&mat=${currentMaterial.Id}&col=${currentColor.Id}`;
	const modelImageAlt = `Model: Option ${currentPosition.Position}, Material ${currentMaterial.Name}, Color ${currentColor.Name}`;

	return (
		<>
			<h1>Product Configurator</h1>
			<form class="product container-fluid" action="#">
				<Positions
					positions={data.Positions}
					selectedPosition={positionId.value}
					handlePositionChange={handlePositionChange}
				/>
				<div id="product-image" class="container product-image-container">
					<img
						src={modelImageSrc}
						alt={modelImageAlt}
					/>
					{currentColor && currentPosition && currentMaterial &&
						<div class="overlays-container">
							<img src={currentPosition.ImageUrl} alt={`Position + ${currentPosition.Position}`} class="overlay-image" />
							<div
								class="overlay-color"
								style={`
											--overlay-background: url(${currentColor.SwatchUrl});
											--mask-image: url(${currentPosition.ImageUrl});
										`}
							/>
						</div>
					}
				</div>
				<Materials
					materials={currentPosition.Materials}
					selectedMaterial={materialId}
					handleMaterialChange={handleMaterialChange}
				/>
				<Colors
					colors={currentMaterial.Colors}
					selectedColor={colorId}
					handleColorChange={handleColorChange}
				/>
				<button class="submit" type="submit">Submit</button>
			</form>
		</>
	);
}

render(<App />, document.getElementById('app') as HTMLElement);
