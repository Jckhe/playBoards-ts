import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';
import { CookiesProvider } from 'react-cookie';
import store from "./redux/store";
import { Provider } from 'react-redux';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

let root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);


//initate a new Apollo Client here to connect to our graphQL server.
const client = new ApolloClient({
  uri: 'localhost:3000/',
  cache: new InMemoryCache(),
  credentials:'same-origin',
})




root.render(
  <ApolloProvider client={client}>
    <CookiesProvider>
      <React.StrictMode>  
        <Provider store={store} >
          <App />
        </Provider>
      </React.StrictMode>
  </CookiesProvider>
  </ApolloProvider>
);