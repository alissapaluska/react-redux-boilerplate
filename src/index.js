import React from 'react'
import './styles/index.css'
import {Provider} from 'react-redux'
import {render} from 'react-dom'
import configureStore from './configureStore'
import App from './containers/App'
// import * as serviceWorker from './serviceWorker'

const store = configureStore();

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)

//TODO: require('dotenv').config();
// function getKey() {
    // return process.env.KEY
// }





// module.exports = {
//     getKey,
// }

// change to .register() for app to work offline and load faster
// pitfalls: https://bit.ly/CRA-PWA
// serviceWorker.unregister();