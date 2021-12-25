import {createStore , combineReducer} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import Login from "./login.js";

const reducers = combineReducer({Login});
const store = ()=>{
    return createStore(reducers , composeWithDevTools())
}
export default store()