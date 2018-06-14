import React, { Component } from 'react';

class SongDetails extends Component {
  render() {

    let song = this.props.songs[this.props.match]

    return (
      <div className="songDetailBox">

        {/* ALBUM COVER */}
        <div className="album">
          <img src={song.img} alt="" />
        </div>

        {/* SONG DETAILS */}
        <div className="details">
          <div className="songTitle">{song.title}&nbsp;</div>
          <button
            className="playDetailBtn"
            onClick={() => this.props.playThisSong(song.id, song.title, song.source)}>
            >
          </button>
          <div className="description">
            {song.description}
          </div>
        </div>
      </div>
    )
  }
}

export default SongDetails;