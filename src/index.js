import React from 'react';

import ReactDOM from 'react-dom/client';
// import { stopReportingRuntimeErrors } from 'react-error-overlay';

import './index.css';
import App from './App';

// if (process.env.NODE_ENV === 'development') {
// 	stopReportingRuntimeErrors(); // disables error overlays
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
