class NewWindow {
  constructor() {
    this.popup;
  }
  open() {
    this.popup = window.open(
      '../index.html',
      'Main',
      'width=400,height=400,resizable=yes'
    );

    let closeButton = document.getElementById('closeButton');
    closeButton.disabled = false;

    let openButton = document.getElementById('openButton');
    openButton.disabled = true;
  }
  close() {
    this.popup.close();

    let closeButton = document.getElementById('closeButton');
    closeButton.disabled = true;

    let openButton = document.getElementById('openButton');
    openButton.disabled = false;
  }
}

const PopUp = new NewWindow();

const squareElement = document.getElementById('square');

let angle = 0;
const rotateSquare = setInterval(() => {
  angle = (angle + 2) % 360;
  squareElement.style.transform = `rotate(${angle}deg)`;
}, 1000 / 60);

const URL = 'wss://ws.postman-echo.com/raw';
const outputDiv = document.getElementById('output');
const form = document.forms[0];
const connection = new WebSocket(URL);

connection.addEventListener(
  'open',
  () => {
    output('CONNECTED');
  },
  false
);

function output(message) {
  const para = document.createElement('p');
  para.innerHTML = message;
  outputDiv.appendChild(para);
}

form.addEventListener('submit', message, false);

function message(event) {
  event.preventDefault();

  const text = form.message.value;
  output(`SENT: ${text}`);
  connection.send(text);
}

connection.addEventListener(
  'message',
  (event) => {
    output(`RESPONSE: ${event.data}`);
  },
  false
);

connection.addEventListener(
  'close',
  () => {
    output('DISCONNECTED');
  },
  false
);
connection.addEventListener(
  'error',
  (event) => {
    output(`<span style='color: red;'>ERROR:${event.data}</span>`);
  },
  false
);

function askNotification() {
  if (window.Notification) {
    Notification.requestPermission();
  }
}

function sendNotification() {
  if (window.Notification) {
    Notification.requestPermission().then((permission) => {
      if (Notification.permission === 'granted') {
        new Notification('WDD330 - José Aguirre - Portfolio', {
          body: 'Thanks for allowing notifications',
          icon: '../images/profilePic.jpg',
        }).addEventListener(
          'click',
          () => {
            window.open('../index.html');
          },
          false
        );
      }
    });
  }
}
