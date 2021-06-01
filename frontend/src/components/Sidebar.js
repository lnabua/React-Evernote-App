import React, { Component } from 'react';
import NoteList from './NoteList';

class Sidebar extends Component {
  state = {
    id: "",
    title: "Enter note title",
    body: "Enter note description",
    sort: 'all',
  }

  newClick = () => {
    const data = {
      id: this.state.id,
      title: this.state.title,
      body: this.state.body,
    };
    fetch('http://localhost:3000/notes', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((newNote) => this.props.addNote(newNote));
  }



  render() {
    return (
      <div className='master-detail-element sidebar'>
        <NoteList notes={this.props.notes} selectNote={this.props.selectNote} />
        <button onClick={this.newClick} >New</button>
      </div>
    );
  }
}

export default Sidebar;
