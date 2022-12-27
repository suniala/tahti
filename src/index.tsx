import React from 'react';
import ReactDOM from 'react-dom';
import './css/skeleton/normalize.css';
import './css/skeleton/skeleton.css';
import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Prevent accidental zooms while tapping by disabling double click events.
document.addEventListener(
    'dblclick',
    (event) => {
        event.preventDefault();
    },
    { passive: false }
);
