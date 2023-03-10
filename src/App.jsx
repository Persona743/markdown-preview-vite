import React, { useState } from 'react';

import Sidebar from './components/Sidebar';
import Editor from './components/Editor';

import { data } from '../data';
import Split from 'react-split';
import { nanoid } from 'nanoid';

import './App.css';

export default function App() {
    const [notes, setNotes] = useState([]);
    const [currenNoteId, setCurrenNoteId] = useState(
        (notes[0] && notes[0].id) || ''
    );

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here",
        };
        setNotes((prevNotes) => [newNote, ...prevNotes]);
        setCurrenNoteId(newNote.id);
    }

    function updateNote(text) {
        setNotes((oldNotes) =>
            oldNotes.map((oldNote) => {
                return oldNote.id === currenNoteId
                    ? { ...oldNote, body: text }
                    : oldNote;
            })
        );
    }

    function findCurrentNote() {
        return (
            notes.find((note) => {
                return note.id=== currenNoteId;
            }) || notes[0]
        );
    }

    return (
        <main>
            {notes.length > 0 ? (
                <Split
                    sizes={[30, 70]}
                    direction="horizontal"
                    className="split"
                >
                    <Sidebar
                        notes={notes}
                        currenNote={findCurrentNote()}
                        setCurrenNoteId={setCurrenNoteId}
                        newNote={createNewNote}
                    />
                    {currenNoteId && notes.length > 0 && (
                        <Editor
                            currentNote={findCurrentNote()}
                            updateNote={updateNote}
                        />
                    )}
                </Split>
            ) : (
                <div className="no-notes">
                    <h1>You have no notes</h1>
                    <button className="first-note" onClick={createNewNote}>
                        Create one now
                    </button>
                </div>
            )}
        </main>
    );
}
