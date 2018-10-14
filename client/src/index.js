import Application from './Components/application'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './store/reducers/reducer'
import thunk from 'redux-thunk'

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><Application/></Provider>, document.getElementById('root'));

