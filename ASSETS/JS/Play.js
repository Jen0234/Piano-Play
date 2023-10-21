const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j']

const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.key--white')
const blackKeys = document.querySelectorAll('.key.key--black')


keys.forEach(key => {
  key.addEventListener('click', () => playNote(key))
})

document.addEventListener('keydown', e => {
  if (e.repeat) return
  const key = e.key
  const whiteKeyIndex = WHITE_KEYS.indexOf(key)
  const blackKeyIndex = BLACK_KEYS.indexOf(key)

  if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex])
  if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex])
})

function playNote(key) {
  const noteAudio = document.getElementById(key.dataset.note)
  noteAudio.currentTime = 0
  noteAudio.play()
  key.classList.add('active')
  noteAudio.addEventListener('ended', () => {
    key.classList.remove('active')
  })
}

//recording

navigator.mediaDevices.getUserMedia({ audio: true })
.then(stream => {
   audioRecorder = new MediaRecorder(stream);
   audioRecorder.start();
   audioRecorder.stop();
   const blobObj = new Blob(audioChunks, { type: 'audio/webm' });
   const audioUrl = URL.createObjectURL(blobObj);
   const audio = new Audio(audioUrl);
   audio.play();
})

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const playButton = document.getElementById('play');
const downloadButton = document.getElementById('download');
let output = document.getElementById('output');
let audioRecorder;
let audioChunks = [];
navigator.mediaDevices.getUserMedia({ audio: true })
   .then(stream => {
   
      // Initialize the media recorder object
      audioRecorder = new MediaRecorder(stream);
      
      // dataavailable event is fired when the recording is stopped
      audioRecorder.addEventListener('dataavailable', e => {
         audioChunks.push(e.data);
      });
      
      // start recording when the start button is clicked
      startButton.addEventListener('click', () => {
         audioChunks = [];
         audioRecorder.start();
         output.innerHTML = 'Recording started! Speak now.';
      });
      
      // stop recording when the stop button is clicked
      stopButton.addEventListener('click', () => {
         audioRecorder.stop();
         output.innerHTML = 'Recording stopped! Click on the play button to play the recorded audio.';
      });
      
      // play the recorded audio when the play button is clicked
      playButton.addEventListener('click', () => {
         const blobObj = new Blob(audioChunks, { type: 'audio/webm' });
         const audioUrl = URL.createObjectURL(blobObj);
         const audio = new Audio(audioUrl);
         audio.play();
         output.innerHTML = 'Playing the recorded audio!';
      });
   }).catch(err => {
   
      // If the user denies permission to record audio, then display an error.
      console.log('Error: ' + err);
   });

