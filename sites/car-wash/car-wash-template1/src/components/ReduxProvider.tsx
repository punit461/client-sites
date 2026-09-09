"use client";

import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/store/store";

let store: AppStore | undefined;

function createStore() {
  if (!store) {
    store = makeStore();
  }
  return store;
}

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={createStore()}>{children}</Provider>;
}
