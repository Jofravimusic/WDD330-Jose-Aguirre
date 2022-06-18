const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
context.strokeStyle = 'red';
context.fillStyle = 'rgba(0, 0, 255, 0.5)';
context.fillRect(10, 10, 100, 100);
context.strokeRect(10, 10, 100, 100);

function saveDrawing() {
  const canvas5 = document.getElementById('myCanvas');
  var win = window.open();
  win.document.write(
    '<iframe src="' +
      canvas5.toDataURL('image/png') +
      '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
  );
}

const button = document.getElementById('saveButton');
button.addEventListener('click', saveDrawing, false);
