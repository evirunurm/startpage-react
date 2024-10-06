import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App.tsx'
import { Provider } from "./service/store";

ReactDOM.render(
  <Provider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
  , document.getElementById('root')
)
