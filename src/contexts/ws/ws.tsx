import { createContext, ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  connected,
  OrderBookArray,
  setChannelId,
  setOrderBookChunk,
  setOrderBookData,
} from "../../redux/websocket/slice";
import { RootState } from "../../store";
import extractData from "../../utils/extractData";

type WebSocketContextState = {
  socket: WebSocket | null;
};
type WebSocketProviderProps = { children: ReactNode };

const WebSocketContext = createContext<WebSocketContextState | null>(null);

function WebSocketProvider({ children }: WebSocketProviderProps) {
  const [ws, setWS] = useState<WebSocketContextState | null>(null);

  const dispatch = useDispatch();
  const precision = useSelector((state: RootState) => state.ws.precision);

  useEffect(() => {
    const url = process.env.REACT_APP_WSS_URL || "";
    const socket = new WebSocket(url);
    socket.onmessage = (msg: any) => {
      dispatch(connected());
      const message = JSON.parse(msg.data);
      if (message?.chanId) {
        console.log("connected", message.chanId);
        setChannelId({ channelId: message.chanId });
      }

      const orderBookData = extractData(message);
      if (Array.isArray(orderBookData) && Array.isArray(orderBookData[0])) {
        dispatch(setOrderBookData({ data: orderBookData as OrderBookArray[] }));
      } else {
        dispatch(setOrderBookChunk({ data: orderBookData as OrderBookArray }));
      }
    };

    let msg = JSON.stringify({
      event: "subscribe",
      channel: "book",
      symbol: "tBTCUSD",
      prec: precision,
      freq: "F0",
      len: "100",
      subId: "book/tBTCUSD/P0",
    });

    socket.onopen = () => socket?.send(msg);

    setWS({
      socket,
    });

    return () => {
      socket?.close();
    };
  }, [dispatch, precision]);

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
}

export type { WebSocketContextState };
export { WebSocketProvider, WebSocketContext };
