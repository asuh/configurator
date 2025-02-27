import { render } from 'preact';
import { useState } from 'preact/hooks';
import config from './data/config.json';
import Positions from './components/Positions';
import Colors from './components/Colors';
import Materials from './components/Materials';

import './style.css';

interface dataConfig {
  BaseImageUrl: string;
  Id: string;
  TemplateId: string;
  ConfigId: string;
  StyleId: string;
  StyleName: string;
  Positions: Position[];
}

interface Color {
  Id: string;
  Name: string;
  SwatchUrl: string;
}

interface Material {
  Id: string;
  Name: string;
  Colors: Color[];
}

interface Position {
  ImageUrl: string;
  Position: string;
  Materials: Material[];
}

const data = config as dataConfig;

export function App() {
  // Initialize selection: use first available options.
  const [positionId, setPositionId] = useState<string>(
    data.Positions[0].Position
  );
  const currentPosition = data.Positions.find(
    (position) => position.Position === positionId
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

	const handlePositionChange = (event: Event) => {
		const selectedPosition = (event.target as HTMLInputElement).value;
		setPositionId(selectedPosition);
	}

	const handleMaterialChange = (event: Event) => {
		const selectedMaterial = (event.target as HTMLInputElement).value;
		setMaterialId(selectedMaterial);
	}

	const handleColorChange = (newColor: string) => {
		setColorId(newColor);
	}
	
	return (
		<>
			<h1>Product Configurator</h1>
			<form class="product container-fluid" action="#">
					<div class="row">
							<Positions
								positions={data.Positions}
								selectedPosition={positionId}
								handlePositionChange={handlePositionChange}
							/>
							<div id="product-image" class="container product-image-container col-xs-12 col-md-9">
								<img src={data.BaseImageUrl} alt={data.StyleId} />
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
					</div>
					<button class="submit" type="submit">Submit</button>
			</form>
		</>
	);
}

render(<App />, document.getElementById('app'));
