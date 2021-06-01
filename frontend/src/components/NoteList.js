import React from 'react';
import NoteItem from './NoteItem';

const NoteList = (props) => {
  return (
    <ul>
      {props.notes.map((note, id) => <NoteItem key={id} note={note} selectNote={props.selectNote} /> )}
    </ul>
  );
}

export default NoteList;
