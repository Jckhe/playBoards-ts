import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App'
import './index.css';
import { CookiesProvider } from 'react-cookie';
import {store} from './redux/store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <React.StrictMode>  
      <Provider store={store} >
        <App />
      </Provider>
    </React.StrictMode>
  </CookiesProvider>
);