import { ADD_NOTE, FETCH_NOTES } from './../../actions/types';

const INITIAL_STATE = {
    arr: [],
    latestNote: {}
};

export default (state = INITIAL_STATE, action) => {

    switch(action.type){
        case ADD_NOTE:
            return {...state, arr: action.payload.notes, latestNote: action.payload.newNote}
        case FETCH_NOTES:
            return {...state, arr: action.payload}
        default: 
            return state;
    }
}