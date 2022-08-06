import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  isConnecting: boolean;
  isConnected: boolean;
  channelId: string | null;
  precision: Precision;
}

enum Precision {
  P0 = "P0",
  P1 = "P1",
  P2 = "P2",
  P3 = "P3",
  P4 = "P4",
}

const initialState: AppState = {
  isConnecting: false,
  isConnected: false,
  channelId: null,
  precision: Precision.P0,
};

export const wsSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {
    connecting: (state) => {
      state.isConnecting = true;
    },
    connected: (state) => {
      state.isConnecting = false;
      state.isConnected = true;
    },
    setChannelId: (state, action: PayloadAction<{ channelId: string }>) => {
      state.channelId = action.payload.channelId;
    },
  },
});

// Action creators are generated for each case reducer function
export const { connecting, connected, setChannelId } = wsSlice.actions;

export default wsSlice.reducer;
