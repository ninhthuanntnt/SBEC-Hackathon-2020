const peer = new Peer();

peer.on('open', function(){
  var clientId = peer.id;
});

$('#btn-call-to-admin').on('click', function() {
  console.log('click');
  socket.emit('client-request-call-to-server');

});

socket.on('server-sent-accept-call-from-admin', function(adminId) {
  $('#btn-call-to-admin').css('display', 'none');

  socket.emit('client-admin-calling-request');

  const getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia).bind(navigator);

  getUserMedia({ video: false, audio: true }, function(stream) {
    const call = peer.call(adminId, stream);

    call.on('stream', function(remoteStream) {
      playStream('audio_client', remoteStream);
    })
  })
});

function playStream(audioId, stream) {
  var audio = document.getElementById(audioId);
  // window.stream = stream; // make variable available to browser console
  audio.srcObject = stream;
}