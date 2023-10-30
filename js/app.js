import { Ajax } from "./services/ajax.js";
import { WebSocketConnect } from "./services/websocket.js";

window.onload = () => {
  let ajax = new Ajax();
  ajax
    .authenticate()
    .then((response) => {
      console.log("authenticate status: " + response.status);

      let websocket = new WebSocketConnect();
      websocket.connect();

      document.getElementById("send-button").addEventListener("click", () => {
        websocket.sendMessage(document.getElementById("text-field").value);
        document.getElementById("text-field").value = "";
      });

      document
        .getElementById("text-field")
        .addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            websocket.sendMessage(document.getElementById("text-field").value);
            document.getElementById("text-field").value = "";
          }
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
