import React from 'react'
import './App.css';
import Main from "./main";
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import * as appReducer from './redux/reducers/appReducer'

const rootReducer = combineReducers({
    filters: appReducer.filterReducer,
    toggleLeftPanel: appReducer.toggleLeftPanel
})
const store = createStore(rootReducer, applyMiddleware(thunk))

function App() {
    return <React.StrictMode>
        <Provider store={store}>
            <Main/>
        </Provider>
    </React.StrictMode>
}

export default App;
