import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import notesReducer from './notesReducer';

const rootReducer = combineReducers({
    notes: notesReducer
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;