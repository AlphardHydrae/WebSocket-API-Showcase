# WebSocket

This project showcases a simple connection between a client and a websocket.

##

### API

The table below explain in details the different API calls.

| Call      | HTTP Methods  | Description                                                                                | Return                                  | Parameters                      |
| --------- | ------------- | ------------------------------------------------------------------------------------------ | --------------------------------------- | ------------------------------- |
| /login    | POST, OPTIONS | authentication process                                                                     | Code: string Name: string Token: string | Code: string                    |
| /messages | GET, OPTIONS  | returns the last 50 messages available on the server                                       | From: string Date: string Text: string  | none                            |
| /ws       | none          | when authenticated, can return the last 50 messages on the server and can publish messages | Token: string                           | auth: string or message: string |

##

### Install

A _config.js_ file is located under _/js/config.js_ and follows the shown structure:

```js
const url = "://url:port";
const code = "code";

export { url, code };
```

##

### Deploy

To run the project simply open the _index.html_ file in any browser.
