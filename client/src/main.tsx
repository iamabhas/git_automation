import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ThemeChanger from "./ThemeChanger.tsx";
import {store} from "../src/redux/store.ts"
import {Provider} from "react-redux";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
      <ThemeChanger>
          <App />
      </ThemeChanger>
      </Provider>

  </React.StrictMode>,
)
