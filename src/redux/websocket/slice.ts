import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* type OrderBook = {
  price: number;
  count: number;
  amount: number;
}; */

export type OrderBookArray = [number, number, number];

export type AppState = {
  isConnecting: boolean;
  isConnected: boolean;
  channelId: string | null;
  precision: Precision;
  data: OrderBookArray[] | null;
  chunk: OrderBookArray | null;
};

export enum Precision {
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
  data: null,
  chunk: null,
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
    setPrecision: (state, action: PayloadAction<{ precision: Precision }>) => {
      state.precision = action.payload.precision;
    },
    setOrderBookData: (
      state,
      action: PayloadAction<{ data: OrderBookArray[] }>
    ) => {
      state.data = action.payload.data;
    },
    setOrderBookChunk: (
      state,
      action: PayloadAction<{ data: OrderBookArray }>
    ) => {
      if (state.data && action.payload.data) {
        state.data = state.data.map((item: OrderBookArray) => {
          if (
            item[0] === action.payload.data[0] &&
            action.payload.data[1] > 0
          ) {
            return action.payload.data;
          }

          return item;
        });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  connecting,
  connected,
  setChannelId,
  setPrecision,
  setOrderBookChunk,
  setOrderBookData,
} = wsSlice.actions;

export default wsSlice.reducer;
