import React from "react";
import { Provider } from "react-redux";
import store from "./Store/store";
import WaterTracker from "./Components/Watertracker/WaterTracker";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <WaterTracker />
    </Provider>
  );
}

export default App;
