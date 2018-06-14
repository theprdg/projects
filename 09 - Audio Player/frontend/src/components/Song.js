import React, { Component } from 'react';

class Song extends Component {
  render() {
    return (
      <span className="songItem">
        {this.props.song.title}
      </span>
    )
  }
}

export default Song;