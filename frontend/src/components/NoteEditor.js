import React, { Component } from 'react';

class NoteEditor extends Component {
  state = {
      title: this.props.note.title,
      body: this.props.note.body,
    }

  titleChange = (e) => {
    this.setState({
      title: e.target.value,
    })
  }

  bodyChange = (e) => {
    this.setState({
      body: e.target.value
    })
  }

  handleSaveClick = (e) => {
    e.preventDefault();
    const data = {
      title: this.state.title,
      body: this.state.body,
    };
    fetch(`http://localhost:3000/notes/${this.props.note.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((updatedNote) => {
        this.props.saveNote(updatedNote)
      });
  }

  handleDeleteClick = (item, url) => {
    fetch(`http://localhost:3000/notes/${this.props.note.id}`, {
      method: 'delete'
    })
    .then(response => response.json());
  }


  render() {
    return (
      <form className="note-editor">
        <input type="text" name="title" value={this.state.title} onChange={this.titleChange} />
        <textarea name="body" value={this.state.body} onChange={this.bodyChange} />
        <div className="button-row">
          <input className="button" type="submit" value="Save" onClick={this.handleSaveClick} />
          <button type="button" onClick={this.props.onClickCancel}>Cancel</button>
          <button type="button" onClick={this.handleDeleteClick}>Delete</button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;
