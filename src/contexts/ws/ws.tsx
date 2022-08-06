import { createContext, ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connected, setChannelId } from "../../redux/websocket/slice";
import { RootState } from "../../store";

type WebSocketContextState = {
  socket: WebSocket | null;
  sendMessage: (roomId: string, message: string) => void;
};
type WebSocketProviderProps = { children: ReactNode };

const WebSocketContext = createContext<WebSocketContextState | null>(null);

function WebSocketProvider({ children }: WebSocketProviderProps) {
  let socket: WebSocket | null = null;
  const [ws, setWS] = useState<WebSocketContextState | null>(null);

  const dispatch = useDispatch();
  const precision = useSelector((state: RootState) => state.ws.precision);

  const sendMessage = () => {
    //
  };

  useEffect(() => {
    if (!socket) {
      const url = process.env.REACT_APP_WSS_URL || "";
      const socket = new WebSocket(url);

      socket.onmessage = (msg: any) => {
        dispatch(connected());
        const message = JSON.parse(msg.data);
        // console.log("connected", message);
        if (message?.chanId) {
          console.log("connected", message.chanId);
          setChannelId({ channelId: message.chanId });
        }
      };

      let msg = JSON.stringify({
        event: "subscribe",
        channel: "book",
        symbol: "tBTCUSD",
        prec: precision,
        freq: "F1",
        len: "100",
        subId: "book/tBTCUSD/P0",
      });

      socket.onopen = () => socket.send(msg);

      setWS({
        socket,
        sendMessage,
      });
    }
  }, [dispatch, socket, precision]);

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
}

export type { WebSocketContextState };
export { WebSocketProvider, WebSocketContext };
