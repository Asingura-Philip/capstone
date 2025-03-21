import React from 'react';
import ReactDOM from 'react-dom/client';
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// const rootElement = document.getElementById('root');

// const root = ReactDOM.createRoot(rootElement);



// root.render(
//   <ChakraProvider> {/* Wrap your app in ChakraProvider to use Chakra UI components */}
//     <App />
//   </ChakraProvider>
// );

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
