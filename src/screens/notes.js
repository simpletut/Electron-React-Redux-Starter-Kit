import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import CKEditor from 'react-ckeditor-wrapper';
import { withRouter } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import classNames from 'classnames';
import toastr from 'toastr';

import { saveNote, addNote, fetchNotes, deleteNote } from './../actions/index';

const initialState = {
    newNote: '',
    _id: '',
    title: '',
    content: '',
    initial_content: '',
    unsaved_changes: false,
    newItemAdded: false
}

class Note extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        }
    }

    componentDidMount() {
        this.props.fetchNotes();

        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }

    }

    componentWillReceiveProps(nextProps) {

        if (this.state.newItemAdded === true && nextProps.latestNote._id !== undefined) {

            const { _id, title, content } = nextProps.latestNote

            this.setState({
                _id: _id,
                title: title,
                content: content,
                initial_content: content,
                unsaved_changes: false,
                newItemAdded: false
            });
        }

    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleEditorChange(content) {
        this.setState({
            content
        });
        this.changes_made();
    }

    changes_made() {
        const { content, initial_content } = this.state;
        this.state;
        this.setState({
            unsaved_changes: content !== initial_content
        });
    }

    validate_newNote() {
        const { newNote } = this.state
        this.state;
        const isInvalid = !newNote;
        return isInvalid;
    }

    submit_newNote(event) {
        event.preventDefault();
        var tempObj = {
            title: this.state.newNote,
            content: ''
        };
        if (this.state.unsaved_changes) {
            confirmAlert({
                title: `Warning`,
                message: `You have unsaved changes`,
                buttons: [
                    {
                        label: `Proceed, without saving`,
                        onClick: () => {
                            this.props.addNote(tempObj);
                            this.setState({
                                newItemAdded: true,
                                newNote: ''
                            });
                        }
                    },
                    {
                        label: 'Cancel'
                    }
                ]
            })
        } else {
            this.props.addNote(tempObj);
            this.setState({
                newItemAdded: true,
                newNote: ''
            });
        }

    }

    openNote(note) {

        const { _id, title, content } = note;

        if (this.state.unsaved_changes) {
            confirmAlert({
                title: `Warning!`,
                message: `You have unsaved changes`,
                buttons: [
                    {
                        label: `Proceed, without saving`,
                        onClick: () => {
                            this.setState({
                                _id: _id,
                                title: title,
                                content: content,
                                initial_content: content
                            });
                        }
                    },
                    {
                        label: 'Cancel'
                    }
                ]
            })

        } else {
            this.setState({
                _id: _id,
                title: title,
                content: content,
                initial_content: content
            });
        }

    }

    closeNote() {
        if (this.state.unsaved_changes) {
            confirmAlert({
                title: `Warning!`,
                message: `You have unsaved changes`,
                buttons: [
                    {
                        label: `Proceed, without saving`,
                        onClick: () => {
                            this.setState({
                                _id: '',
                                title: '',
                                content: '',
                                initial_content: '',
                                unsaved_changes: false
                            });
                        }
                    },
                    {
                        label: 'Cancel'
                    }
                ]
            })

        } else {
            this.setState({
                _id: '',
                title: '',
                content: '',
                initial_content: '',
                unsaved_changes: false
            });
        }
    }


    handleSaveNote() {
        const tempObj = {
            _id: this.state._id,
            content: this.state.content
        }
        this.props.saveNote(tempObj);
        this.setState({
            initial_content: this.state.content,
            unsaved_changes: false
        });

        toastr.success('Your changes have been saved.', 'Hoorah')
    }

    deleteNote() {
        this.props.deleteNote(this.state._id);
        this.setState({
            _id: '',
            title: '',
            content: '',
            initial_content: '',
            unsaved_changes: false
        });
    }

    render() {

        const deleteNote_alertOptions = {
            title: `Warning`,
            message: `You are about to permanently delete '${this.state.title}'`,
            buttons: [
                {
                    label: 'Yes, please delete.',
                    onClick: () => this.deleteNote()
                },
                {
                    label: 'No, I want to keep my note!'
                }
            ]
        }

        const { title, content, newNote } = this.state;
        this.state;

        return (
            <section className="notes_wrap">

                <aside className="notes_sidebar">

                    <div className="wrap">

                        <div className="newNote">
                            <form onSubmit={event => this.submit_newNote(event)}>
                                <div className="form_wrap">
                                    <div className="form_row">
                                        <div className="form_item">
                                            <div className="form_input">
                                                <input type="text" name="newNote" placeholder="New note..." value={newNote} onChange={this.handleChange.bind(this)} />
                                                <span className="bottom_border"></span>
                                                <button type="submit" disabled={this.validate_newNote()}>
                                                    <i className="fas fa-plus-circle"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <nav>
                            <ul>
                                {this.props.notes.map((note, index) => (
                                    <li key={index}>
                                        <span className={classNames({ 'item_wrap': true, 'active': note._id === this.state._id })} onClick={() => this.openNote(note)}>
                                            <span className="hash">#</span> <span className="title">{note.title}</span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                    </div>

                </aside>

                {this.state.title === '' &&
                    <div className="empty">
                        <p>
                            Nothing selected.
                                </p>
                    </div>
                }

                <div className="grid">
                    <div className="column column_12_12">

                        {this.state.title !== '' &&
                            <div className="editor_wrap">

                                <div className="toolbar">

                                    <h1>{title}</h1>

                                    <div className="actions">
                                        <span className="save">
                                            <button onClick={() => this.handleSaveNote()} className={classNames({ 'alert': this.state.unsaved_changes, 'saveButton': true })}>
                                                <i className="far fa-save"></i>
                                            </button>
                                        </span>
                                        <span className="delete">
                                            <button onClick={() => confirmAlert(deleteNote_alertOptions)}>
                                                <i className="far fa-trash-alt"></i>
                                            </button>
                                        </span>
                                        <span className="close">
                                            <button onClick={() => this.closeNote()}>
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </span>
                                    </div>

                                </div>

                                <CKEditor
                                    name="note_editor"
                                    value={content}
                                    onChange={this.handleEditorChange.bind(this)}
                                    config={{ extraAllowedContent: 'div(*); p(*); strong(*);', height: 573 }}
                                />

                            </div>
                        }


                    </div>
                </div>

            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        notes: state.notes.arr,
        latestNote: state.notes.latestNote
    }
}

export default withRouter(connect(mapStateToProps, { addNote, saveNote, fetchNotes, deleteNote })(Note));