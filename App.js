import React from "react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import RootNavigator from "./src/features/rootNavigator";
import configureStore from "./src/store/configureStore";

import Sentry from 'sentry-expo';

const { store, persistor } = configureStore();

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>{() => <RootNavigator />}</PersistGate>
  </Provider>
);

// Remove this once Sentry is correctly setup.
Sentry.enableInExpoDevelopment = true;

Sentry.config('https://9b46bad3a3e44959845540e33f723584@sentry.io/1316473').install();
