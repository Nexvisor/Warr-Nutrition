"use client";

import { Provider } from "react-redux";

import { ReactNode } from "react";
import { store, persistor } from "./Store";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "@/app/component/Loader";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
