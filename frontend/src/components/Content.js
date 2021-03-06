import React, { Component } from 'react';
import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';
import Instructions from './Instructions';

class Content extends Component {

  renderContent = () => {
    if (this.props.edit !== false) {
      return <NoteEditor note={this.props.note} onClickCancel={this.props.onClickCancel} saveNote={this.props.saveNote} />;
    } else if (this.props.note != null) {
      return <NoteViewer note={this.props.note} editNote={this.props.editNote} />;
    } else {
      return <Instructions />;
    }
  }

  render() {
    return (
      <div className='master-detail-element detail'>
        {this.renderContent()}
      </div>
    );
  }
}

export default Content;
