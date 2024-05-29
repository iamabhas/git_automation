import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ThemeChanger from "./ThemeChanger.tsx";
import {store,persistor} from "../src/redux/store.ts"
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate persistor={persistor}>
      <ThemeChanger>
          <App />
      </ThemeChanger>
        </PersistGate>
      </Provider>

  </React.StrictMode>,
)
