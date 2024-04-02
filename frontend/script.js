const username = window.prompt("Input your name") || "Guest";
const usernameArea = document.getElementById("username");
usernameArea.textContent = `Username: ${username}`;

const ws = new WebSocket("ws://localhost:3001");

ws.onopen = () => {
  console.log("WebSocket is connected.");
};

ws.onmessage = async (event) => {
  const message = document.createElement("li");
  message.textContent = await event.data.text();
  document.getElementById("messages").appendChild(message);
};

const sendMessage = () => {
  const message = document.getElementById("message").value;
  ws.send(`${username}: "${message}"`);
  document.getElementById("message").value = "";
};
