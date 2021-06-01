import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';

class NoteContainer extends Component {
  state = {
    notes: [],
    selectedNote: null,
    edit: false,
    searchTerm: "",
    originalNotes: [],
  }

  componentDidMount() {
    fetch('http://localhost:3000/notes')
      .then(res => res.json())
      .then( notes => {
        this.setState({ notes, originalNotes: notes })
      });
  }  


  selectNote = (note) => {
    if (this.state.selectedNote != null && this.state.edit === true) {
      this.cancelEditNote();
    }
    this.setState({selectedNote: note})
  }

  editNote = () => {
    this.setState({edit: true})
  }

  cancelEditNote = () => {
    this.setState({edit: false});
  }

  addNote = (newNote) => {
    this.setState({ notes: [...this.state.notes, newNote], originalNotes: [...this.state.originalNotes, newNote] });
  }

  saveNote = (updatedNote) => {
    this.setState({notes: this.state.notes.map(note => note.id !== updatedNote.id ? note : updatedNote )})
  }

  handleSearchTermChange = (searchTerm) => { 
    const excludeKeys = ["id"];
    const filteredNotes = this.state.originalNotes.filter(n => {
      const searchedTerm = searchTerm.toLowerCase().split(" ").join("")
      return Object.keys(n).some(key => {
        return excludeKeys.includes(key) ? false : n[key].toLowerCase().split(" ").join("").indexOf(searchedTerm) !== -1});
    });
    this.setState({searchTerm, notes: filteredNotes})
  }

  render() {
    return (
      <Fragment>
        <Search searchTerm={this.state.searchTerm} handleSearchTermChange={this.handleSearchTermChange} />
        <div className='container'>
          <Sidebar notes={this.state.notes} selectNote={this.selectNote} addNote={this.addNote} />
          <Content note={this.state.selectedNote} onClickCancel={this.cancelEditNote} editNote={this.editNote} edit={this.state.edit} saveNote={this.saveNote} />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;


