import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Song from './Song';

class SongsList extends Component {
  render() {
    let songsJSX = this.props.songs.map((song, index) => {
      let link = "/" + song.id;
      return (
        <div 
          //I NEED TO EXPLAIN TO YOU WHY KEY IS SET TO INDEX AND NOT DATE()
          key={index} 
          className="songItemBox">

          {/* PLAY BUTTON */}
          <button 
            className="playBtn"
            onClick={() => this.props.playThisSong(song.id, song.title, song.source)}>
            >
          </button>
          <Link to={link}>
            <Song song={song} />
          </Link>
        </div>
      )
    })

    return (
      <div className="songListBox">
        {songsJSX}
      </div>
    )
  }
}

export default SongsList;