import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import SongsList from './components/SongsList';
import SongDetails from './components/SongDetails';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,    //render sycronously on load
      isPlaying: false,   //play status
      status: 'playhard', //play/pause message
      currentSong: 0,     //song ID/index
      currentSongTitle: 'Upstep',
      currentSongSrc: '/upstep.mp3',
      runTimeSec: 0,      //song runtime counter
      songDuration: 0,    
      songs: []
    }
  }

  //get song data from server
  componentDidMount() {
    axios.get('http://localhost:8080/')
      .then(response => {
        this.setState({
          songs: response.data,
          isLoading: false
        })
      })
      
      //synchronously obtain audio data before they are 
      //queried in the initial render
      .then(() => {
        this.refs.player.onloadeddata = () => {
          this.setState({
            songDuration: this.refs.player.duration
          })
        };
      })
      .catch(error => {
        console.log(error);
      })
  }

  //method to play song set in state
  playAudio = () => {
    this.refs.player.play();
    this.setState({
      isPlaying: true,
      status: 'positive'
    })
  }

  //method to pause song set in state
  pauseAudio = () => {
    this.refs.player.pause();
    this.setState({
      isPlaying: false,
      status: 'playhard'
    })
  }

  //method to cycle through playlist
  changeSong = (change) => {

    let songID = this.state.currentSong;

    if (songID + change > this.state.songs.length - 1)
      songID = 0;
    else if (songID + change < 0)
      songID = this.state.songs.length - 1;
    else songID += change;

    let findSong = this.state.songs[this.state.songs.findIndex(song => song.id === songID)];

    let newSongTitle = findSong.title,
      newSongSrc = findSong.source;

    this.setState({
      currentSong: songID,
      currentSongTitle: newSongTitle,
      currentSongSrc: newSongSrc
    })
  }

  //method to persist play/pause status through song change
  componentDidUpdate() {
    this.state.isPlaying ? this.refs.player.play() : this.refs.player.pause()
  }

  //method to play selected song in Song Details page
  playThisSong = (id, title, src) => {
    this.setState({
      isPlaying: true,
      status: 'positive',
      currentSong: id,
      currentSongTitle: title,
      currentSongSrc: src
    })
  }

  //method to update runtime of song
  runTime = (e) => {
    this.setState({
      runTimeSec: e.currentTime
    })
  }

  render() {
    
    //force sychronous rendering
    if (this.state.isLoading)
      return <span>It's gonna drop like it's hot!</span>

    //calculate song times to display in M:SS format
    let songMin = Math.floor(this.state.songDuration / 60),
      songSec = ('0' + Math.floor(this.state.songDuration % 60)).slice(-2),
      runTimeMin = Math.floor(this.state.runTimeSec / 60),
      runTimeSec = ('0' + Math.floor(this.state.runTimeSec % 60)).slice(-2)

    return (
      <div className="container">

        {/* BACKGROUND IMAGE/ANIMATION */}
        <div className="fullscreen-bg">
          <video loop muted autoPlay
            poster="/img/videobg.jpg" className="fullscreen-bg__video"
            src="/videobg.mp4">
          </video>
        </div>
        <div className="playerBox">

          {/* AUDIO PLAYER */}
          <audio
            ref="player"
            onTimeUpdate={() =>
              this.runTime(this.refs.player)}
            src={this.state.currentSongSrc}>
          </audio>

          {/* PLAY/PAUSE BUTTON */}
          <div className="menu">
            <span
              className="headText"
              onClick={this.state.isPlaying ? this.pauseAudio : this.playAudio}>{this.state.status === 'playhard' ? this.state.status.slice(0, 4).toUpperCase() : this.state.status.slice(0, 3).toUpperCase()}
            </span>
            <span className="tailText">
              {this.state.status === 'playhard' ? this.state.status.slice(-4).toUpperCase() : this.state.status.slice(-5).toUpperCase()}
            </span>
          </div>

          {/* PREVIOUS SONG BUTTON */}
          <div className="menu">
            <span
              className="headText"
              onClick={() => this.changeSong(-1)}>
              PREV
            </span>
            <span className="tailText">AIL</span>
          </div>

          {/* NEXT SONG BUTTON */}
          <div className="menu">
            <span
              className="headText"
              onClick={() => this.changeSong(1)}>
              NEXT
            </span>
            <span className="tailText">
              LEVEL
            </span>
          </div>

          {/* CURRENT SONG */}
          <div className="menu">
            <span className="tailText">SONG</span>
            <span className="songName">
              :{this.state.currentSongTitle.toUpperCase()}
            </span>
          </div>
        </div>

        {/* SONG TIME INFORMATION */}
        <div className="menu timeBox">
          <div className="time">
            {runTimeMin}:{runTimeSec}
          </div>
          <div className="time">
            / {songMin}:{songSec}
          </div>
        </div>

        <Switch>

          {/* HOME PAGE ROUTE */}
          <Route exact
            path='/'
            render={
              () => <SongsList
                songs={this.state.songs}
                playThisSong={this.playThisSong} />
            } />

          {/* SONG DETAILS ROUTE */}
          <Route
            exact path='/:songId'
            render={
              (props) => {

                //GRAB songID FROM URL
                let songID = props.match.params.songId,

                  //VERIFY songID EXISTS WITHIN SONGS LIST
                  songFound = this.state.songs.findIndex(song => song.id === Number(songID));
                  
                //DISPLAY ERROR PAGE IF songID DOESN'T EXIST, SONG DETAILS IF IT DOES
                return (isNaN(Number(songID)) || songFound === -1) ?
                  <Redirect to='/' /> :
                  <SongDetails
                    songs={this.state.songs}
                    match={props.match.params.songId}
                    playThisSong={this.playThisSong} />
              }
            } />

          {/* ERROR ROUTE */}
          <Route path='/*/*' render={() => {
            return <Redirect to='/' />
          }} />
        </Switch>
      </div >
    );
  }
}

export default App;
