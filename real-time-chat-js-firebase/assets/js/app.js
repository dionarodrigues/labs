// DOM queries
const $chatList = document.querySelector('.chat-list');
const $newChatForm = document.querySelector('.new-chat');
const $newNameForm = document.querySelector('.new-name');
const $chatroomsBtnsWrapper = document.querySelector('.chat-rooms');
const $chatroomsBtns = document.querySelectorAll('.chat-rooms .btn');
const $updateMessage = document.querySelector('.update-mssg');

// Check Local Storage for room and username  
const room = localStorage['@chatRoom'] ? localStorage['@chatRoom'] : 'general'; 
const username = localStorage['@chatUserName'] ? localStorage['@chatUserName'] : 'Anon'; 

// class instance
const chatUI = new ChatUI($chatList);
const chatroom = new Chatroom(room, username);

// active room btn
chatUI.activeBtnRoom($chatroomsBtns, room);

// get chats and render
function getChats() {
  chatroom.getChats(data => chatUI.render(data));
}

getChats();

// add new chat
$newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = $newChatForm.message.value.trim();
  chatroom.addChat(message)
    .then(() => $newChatForm.reset())
    .catch(err => console.log(err))
});

// update username
$newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = $newNameForm.name.value.trim();

  chatroom.updateName(name);
  $newNameForm.reset();
  $updateMessage.classList.remove('d-none');
  $updateMessage.innerHTML = `Your name was updated to ${name}`;
  setTimeout(() => {
    $updateMessage.classList.add('d-none');
    $updateMessage.innerHTML = '';
  }, 3000);
});

// update room
$chatroomsBtnsWrapper.addEventListener('click', e => {
  e.preventDefault();
  if(e.target.tagName == 'BUTTON') {
    const $btn = e.target;
    const room = $btn.getAttribute('id');

    chatUI.clear();
    chatroom.updateRoom(room);
    getChats();

    chatUI.activeBtnRoom($chatroomsBtns, room);
  }  
});