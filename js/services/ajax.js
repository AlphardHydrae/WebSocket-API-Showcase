import { url, code } from "../config.js";

export class Ajax {
  constructor() {
    this.url = url;
    this.code = code;
    this.xhr = new XMLHttpRequest();
  }

  authenticate() {
    return new Promise((resolve, reject) => {
      this.xhr.open("POST", "http" + this.url + "/login");
      this.xhr.setRequestHeader("Content-Type", "application/json");

      this.xhr.onload = () => {
        if (this.xhr.status === 200) {
          let user = JSON.parse(this.xhr.responseText);

          document.getElementById("name").innerHTML = user.Name;

          localStorage.setItem("token", user.Token);
          localStorage.setItem("name", user.Name);

          resolve({ status: 200 });
        } else {
          reject({ status: this.xhr.status });
        }
      };

      this.xhr.onerror = () => {
        reject("authentification failed");
      };

      this.xhr.send(
        JSON.stringify({
          code: this.code,
        })
      );
    });
  }
}
