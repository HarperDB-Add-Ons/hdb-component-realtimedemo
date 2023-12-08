import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

import './app.scss';
import config from './config';

window.records = Object.fromEntries(config.subscriberTypes.map((l) => [l, []]));

const container = document.getElementById('app');
const root = createRoot(container);

root.render(<App />);
