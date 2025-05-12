import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/app/app';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import './styles.css';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	<Provider store={store}>
		<StrictMode>
			<BrowserRouter>
				<DndProvider backend={HTML5Backend}>
					<App />
				</DndProvider>
			</BrowserRouter>
		</StrictMode>
	</Provider>
);
