// // client.js
// const socket = io();

// const messageContainer = document.getElementById("msg-container");
// const nameInput = document.getElementById("name-input");
// const messageForm = document.getElementById("msg-form");
// const messageInput = document.getElementById("message-input");

// messageForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   sendMsg();
// });

// socket.on("client-total", (data) => {
//   console.log(data);
// });

// function sendMsg() {
//   if (messageInput.value === "") return;
//   console.log(messageInput.value);
//   const data = {
//     name: nameInput.value,
//     message: messageInput.value,
//   };
//   socket.emit("message", data);
//   addMsg(true, data);
//   messageInput.value = "";
// }

// socket.on("messages", (data) => {
//   console.log(data);
//   addMsg(false, data);
// });

// function addMsg(OwnMsg, data) {
//   clearFeedBack();
//   const element = ` <li class="${OwnMsg ? "msg-right" : "msg-left"} ">
//                  <p class="message">${data.message}</p><span>${data.name}</span>
//                     </li>`;

//   messageContainer.innerHTML += element;
//   scrollBottom();
// }

// function scrollBottom() {
//   messageContainer.scrollTo(0, messageContainer.scrollHeight);
// }

// messageInput.addEventListener("focus", (e) => {
//   socket.emit("feedBack", {
//     feedBack: `${nameInput.value} is typing a message`,
//   });
// });

// messageInput.addEventListener("keypress", (e) => {
//   socket.emit("feedBack", {
//     feedBack: `${nameInput.value} is typing a message`,
//   });
// });

// messageInput.addEventListener("blur", (e) => {
//   socket.emit("feedBack", {
//     feedBack: "",
//   });
// });

// socket.on("feedBack", (data) => {
//   clearFeedBack();
//   const element = ` <li class="msg-feedback"><p class="feedback" id="feedback">${data.feedBack}</p></li>`;
//   messageContainer.innerHTML += element;
// });

// function clearFeedBack() {
//   document.querySelectorAll("li.msg-feedback").forEach((element) => {
//     element.parentNode(element);
//   });
// }

const socket = io();

const messageContainer = document.getElementById("msg-container");
const nameInput = document.getElementById("name-input");
const messageForm = document.getElementById("msg-form");
const messageInput = document.getElementById("message-input");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMsg();
});

socket.on("client-total", (data) => {
  console.log(data);
});

function sendMsg() {
  if (messageInput.value.trim() === "") return;
  const data = {
    name: nameInput.value,
    message: messageInput.value,
  };
  socket.emit("message", data);
  addMsg(true, data);
  messageInput.value = "";
}

socket.on("messages", (data) => {
  console.log(data);
  addMsg(false, data);
});

function addMsg(OwnMsg, data) {
  clearFeedBack();
  const element = ` <li class="${OwnMsg ? "msg-right" : "msg-left"} ">
                     <p class="message">${data.message}   
                     <br><br>
                     <span>${data.name}</span></p>
                    </li>`;

  messageContainer.innerHTML += element;
  scrollBottom();
}

function scrollBottom() {
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
  

messageInput.addEventListener("input", (e) => {
  socket.emit("feedBack", {
    feedBack: `${nameInput.value} is typing a message`,
  });
});

socket.on("feedBack", (data) => {
  clearFeedBack();
  const element = ` <li class="msg-feedback"><p class="feedback" id="feedback">${data.feedBack}</p></li>`;
  messageContainer.innerHTML += element;
});

function clearFeedBack() {
  const feedbackElements = document.querySelectorAll(".msg-feedback");
  feedbackElements.forEach((element) => {
    element.remove();
  });
}
