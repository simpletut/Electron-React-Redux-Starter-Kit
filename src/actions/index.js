import { ADD_NOTE, FETCH_NOTES, SAVE_NOTE, DELETE_NOTE } from './types';
import electron from 'electron';

const { ipcRenderer } = electron;

export const addNote = note => dispatch => {

    ipcRenderer.send('addNote', note);
    ipcRenderer.on('note:added', (event, notes, newNote) => {

        var tempObj = {
            notes,
            newNote
        }

        dispatch({
            type: ADD_NOTE,
            payload: tempObj
        });
    });

};

export function fetchNotes() {
    return dispatch => {
        ipcRenderer.send('fetchNotes');
        ipcRenderer.on('fetched:notes', (event, notes) => {
            dispatch({
                type: FETCH_NOTES,
                payload: notes
            });
        });
    }

}

export function saveNote(note) {
    return dispatch => {
        ipcRenderer.send('saveNote', note);
        ipcRenderer.on('note:saved', (event, notes) => {
            dispatch({
                type: FETCH_NOTES,
                payload: notes
            });
        });
    }
}

export function deleteNote(_id){
    return dispatch => {
        ipcRenderer.send('deleteNote', _id);
        ipcRenderer.on('note:deleted', (event, notes) => {
            dispatch({
                type: FETCH_NOTES,
                payload: notes
            });
        });
    }
}