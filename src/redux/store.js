import { applyMiddleware, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { composeWithDevTools } from "remote-redux-devtools";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducers"

const persistConfig = {
    key: "root",
    storage,
    blacklist: []
  };

const makeStore = () => {
    const middleware = [];
    const enhancers = [];
  
    enhancers.push(applyMiddleware(...middleware));
  
    // Redux persist
    const persistedReducer = persistReducer(persistConfig, rootReducer);
  
    // Redux devtools
    const composeEnhancers = composeWithDevTools({
      hostname: "localhost",
      port: 8000
    });
  
    const store = createStore(persistedReducer, composeEnhancers(...enhancers));
    const persistor = persistStore(store);
  
    return { store, persistor };
  };
  
  const { store, persistor } = makeStore();
  
  export { store, persistor };
