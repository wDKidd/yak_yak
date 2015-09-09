var socket = io.connect();

function addMessage(msg, pseudo){
  $('#chatEntries').append('<div class="message"><p>' + pseudo + " : " + msg + '</p></div>');
};

function sentMessage(){
  var msg = $('#messageInput').val();
  var pseudoInput = $('#pseudoInput').val();
  if (msg != '') {
      socket.emit('message', msg);
      addMessage(msg, pseudoInput, true);
      msg = '';
      pseudoInput = '';

  }
};

function setPseudo(){
  var pseudoInput = $('#pseudoInput').val();
  if (pseudoInput !== ''){
    socket.emit('setPseudo', pseudoInput);
      $('#chatControls').show();
      $('#pseudoInput').hide();
      $('#pseudoSet').hide();
      $('#instructions').text('');
  }
};

socket.on('message', function(data){
  addMessage(data['message'], data['pseudo']);
});

$(function(){
  $('#chatControls').hide();
  $('#pseudoSet').click(function(){
      setPseudo();
  });
  $('#submit').click(function(){
      sentMessage();
  })
})
