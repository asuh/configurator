import { render, createContext } from 'preact';
import Form from './components/Form';
import Image from './components/Image';
import data from './data/config.json';

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
			<Form />
			<Image />
		</Data.Provider>
	);
}

render(<App />, document.getElementById('app'));
