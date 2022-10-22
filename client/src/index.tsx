import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';
import { CookiesProvider } from 'react-cookie';
import store from "./redux/store";
import { Provider } from 'react-redux';


let root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <CookiesProvider>
    <React.StrictMode>  
      <Provider store={store} >
        <App />
      </Provider>
    </React.StrictMode>
  </CookiesProvider>
);