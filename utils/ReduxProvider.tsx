"use client";

import { Provider } from "react-redux";

import { ReactNode } from "react";
import { store, persistor } from "./Store";
import { PersistGate } from "redux-persist/integration/react";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading="null" persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
