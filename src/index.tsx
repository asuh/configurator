import { render, createContext } from 'preact';
import data from './data/config.json';
import Positions from './components/Positions';
import Colors from './components/Colors';
import Materials from './components/Materials';
import Image from './components/Image';

import './style.css';

interface ConfigData {
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

export const Data = createContext<ConfigData>(data);

export function App() {
	return (
		<Data.Provider value={data}>
			<h1>Product Configurator</h1>
				<form class="product container-fluid" action="#">
						<div class="row">
								<Positions />
								<Image />
								<Materials />
								<Colors />
						</div>
						<button class="submit" type="submit">Submit</button>
				</form>
		</Data.Provider>
	);
}

render(<App />, document.getElementById('app'));
