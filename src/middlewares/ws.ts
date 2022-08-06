import { Middleware } from "redux";
import { connecting, connected } from "../redux/websocket/slice";

const wsMiddleware: Middleware = (store) => (next) => (action) => {
  console.log("middleware", action);
  /* if (!connecting.match(action)) {
    return next(action);
  }

  const url = process.env.REACT_APP_WSS_URL || "";

  const w = new WebSocket(url);

  w.onmessage = (msg) => {
    store.dispatch(connected);
  };

  let msg = JSON.stringify({
    event: "subscribe",
    channel: "book",
    symbol: "tBTCUSD",
    prec: "P0",
    freq: "F1",
    len: "100",
    subId: "book/tBTCUSD/P0",
  });

  w.onopen = () => w.send(msg); */

  next(action);
};

export default wsMiddleware;
