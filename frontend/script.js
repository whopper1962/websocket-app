const username = window.prompt("Input your name") || "Guest";
const usernameArea = document.getElementById("username");
usernameArea.textContent = `Username: ${username}`;

const ws = new WebSocket("ws://localhost:3001");

ws.onopen = () => {
  console.log("WebSocket is connected.");
  const data = JSON.stringify({
    type: "initialize",
    userId: username,
  });
  ws.send(data);
};

ws.onmessage = async (event) => {
  const message = document.createElement("li");
  message.textContent = event.data;
  document.getElementById("messages").appendChild(message);
};

const sendMessage = () => {
  const message = document.getElementById("message").value;
  const recipient = document.getElementById("recipient").value;

  const data = JSON.stringify({
    sender: username,
    recipient: recipient,
    message: `[${username} to ${recipient}]: "${message}"`,
  });
  ws.send(data);
  document.getElementById("message").value = "";
};
