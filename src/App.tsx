import { Buffer } from 'buffer';
import React from 'react';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from './store/store';
import { Provider } from 'react-redux';
import './App.css';
import './assets/_main.scss';
import Routes from './routes';

// global.Buffer = Buffer;
const persistor = persistStore(store);

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className="App">
                        <Routes />
                 </div>
            </PersistGate>
        </Provider>
    );
}

export default App;


