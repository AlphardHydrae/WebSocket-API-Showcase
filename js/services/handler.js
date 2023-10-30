import { url } from "../config.js";

export class Handler {
  constructor() {
    this.url = url;
    this.xhr = new XMLHttpRequest();
  }

  fetchMessages(token, name) {
    this.xhr.open("GET", "http" + this.url + "/messages");
    this.xhr.setRequestHeader("Authorization", "Basic " + token);

    this.xhr.onload = () => {
      if (this.xhr.status === 200) {
        let messages = JSON.parse(this.xhr.responseText);

        messages
          .slice()
          .reverse()
          .forEach((message) => {
            this.createMessage(message, name, "last");
          });

        console.log("fetch status: " + this.xhr.status);
      } else {
        console.log("fetch status: " + this.xhr.status);
      }
    };

    this.xhr.onerror = () => {
      console.log("fetch failed");
    };

    this.xhr.send();
  }

  createMessage(message, name, position) {
    let div = document.createElement("div");

    let divDateTime = document.createElement("div");
    divDateTime.classList.add("message-date-time");
    divDateTime.innerHTML = "[" + message.Date.replace("T", " ") + "]";

    let divContent = document.createElement("div");
    divContent.classList.add("message-content");

    let divSource = document.createElement("div");
    divSource.classList.add("message-source");
    divSource.innerHTML = "(" + message.From + ")";

    let divText = document.createElement("div");
    divText.classList.add("message-text");
    divText.innerHTML = message.Text;

    if (message.From === name) {
      div.classList.add("message", "message-out");

      div.appendChild(divDateTime);
      divContent.appendChild(divText);
      divContent.appendChild(divSource);
      div.appendChild(divContent);
    } else {
      div.classList.add("message", "message-in");

      div.appendChild(divDateTime);
      divContent.appendChild(divSource);
      divContent.appendChild(divText);
      div.appendChild(divContent);
    }

    let chat = document.getElementById("chat");

    if (position === "first") {
      chat.insertBefore(div, chat.firstChild);
    } else {
      chat.appendChild(div);
    }
  }
}
