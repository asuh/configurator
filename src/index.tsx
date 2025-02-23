import { render, createContext } from 'preact';
import Form from './components/Form';
import Image from './components/Image';
import data from './data/config.json';

import './style.css';

export const Data = createContext(data);

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
