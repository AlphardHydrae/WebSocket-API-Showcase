import { url } from "../config.js";
import { Handler } from "./handler.js";

export class WebSocketConnect {
  constructor() {
    this.url = url;
    this.ws = new WebSocket("ws" + this.url + "/ws");
    this.handler = new Handler();
  }

  connect() {
    this.ws.onopen = () => {
      console.log("connection success");

      this.ws.send(
        JSON.stringify({
          auth: localStorage.getItem("token"),
        })
      );

      this.loadMessages();
    };

    this.ws.onclose = () => {
      console.log("connection closed");
    };

    this.ws.onmessage = (event) => {
      let message = event.data;
      console.log("new message: " + message);

      this.getMessage(JSON.parse(message));
    };

    this.ws.onerror = (event) => {
      console.log("error: " + event.message);
    };
  }

  loadMessages() {
    this.handler.fetchMessages(
      localStorage.getItem("token"),
      localStorage.getItem("name")
    );
  }

  getMessage(message) {
    this.handler.createMessage(message, localStorage.getItem("name"));
  }

  sendMessage(message) {
    this.ws.send(
      JSON.stringify({
        message: message,
      })
    );
  }
}
