import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes';
import { Provider } from 'react-redux';
import ReduxStore from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={ReduxStore()}>
      <App />
    </Provider>
  </React.StrictMode>
);


