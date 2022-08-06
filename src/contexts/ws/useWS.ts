import { useContext, useState } from "react";
import { WebSocketContext, WebSocketContextState } from "./ws";

function useWS() {
  const context = useContext<WebSocketContextState | null>(WebSocketContext);

  const sendMessage = () => {
    // context?.socket
  }

  return {
    sendMessage,
  }
}

export default useWS;
