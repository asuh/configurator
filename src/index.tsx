import { render } from 'preact';
import Form from './components/form';

import './style.css';

export function App() {
	return (
		<div>
			<h1>Product Configurator</h1>
			<Form />
		</div>
	);
}

render(<App />, document.getElementById('app'));
