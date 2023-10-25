import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import React from 'react'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();