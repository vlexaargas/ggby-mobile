import React from "react";
import * as Sentry from "sentry-expo";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import RootNavigator from "./src/features/rootNavigator";
import configureStore from "./src/store/configureStore";

const { store, persistor } = configureStore();

Sentry.init({
  dsn: "https://9b46bad3a3e44959845540e33f723584@sentry.io/1316473",
  enableInExpoDevelopment: true,
  debug: true
});

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>{() => <RootNavigator />}</PersistGate>
  </Provider>
);
