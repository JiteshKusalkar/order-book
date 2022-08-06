import { Provider } from "react-redux";
import { WebSocketProvider } from "./contexts/ws";
import { store } from "./store";

type AppProvidersProps = {
  children: React.ReactNode;
};

function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <WebSocketProvider>{children}</WebSocketProvider>
    </Provider>
  );
}

export default AppProviders;
