const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function Song(source, img, title, description, id) {
  this.source = source;
  this.img = img;
  this.title = title;
  this.description = description;
  this.id = id;
}

const songs = [
  new Song('/upstep.mp3', '/img/upstep.jpg', 'Upstep', 'Brutal beat and bulky bass are the foundation for a dubstep frenzy featuring synths, wailing guitar and jitters and glitches. Tempo: 140bpm', 0),
  new Song('/olympian.mp3', '/img/olympian.jpg', 'Olympian', 'An energetic, vibrant track featuring positive electric guitar licks and modern drums creates useful sports theme. Tempo: 130bpm', 1),
  new Song('/transmission.mp3', '/img/transmission.jpg', 'Transmission', 'Energetic electronic melody featuring modern drums, snaking bass and explosive electric guitar. Tempo: 120bpm', 2)
]

app.get('/', (req,res) => {
  res.json(songs);
})

app.listen(8080, () => {
  console.log('listening');
})