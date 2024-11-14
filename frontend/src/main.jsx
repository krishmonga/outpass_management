import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BACKEND_URI } from "./assets/constant/index.js";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: BACKEND_URI,
  cache: new InMemoryCache(),
  credentials: 'include'
});

console.log("this is ", BACKEND_URI)

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
  <StrictMode>
    <App />
  </StrictMode>,
  </ApolloProvider>
)
