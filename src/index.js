import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from "../public/App/App";

window.onload = () => {
    const el = document.getElementById('root');
    ReactDOM.render(<App />, el);
}