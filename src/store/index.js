import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';
import { ENABLE_REDUX_LOGGER } from '../config';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['account']
};

const loggerMiddleware = createLogger();

export function configureStore (preloadedState = {}) {
  const middlewares = [thunkMiddleware];

  if (ENABLE_REDUX_LOGGER) {
    middlewares.push(loggerMiddleware);
  }

  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const pReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(pReducer, preloadedState, composedEnhancers);
  const persistor = persistStore(store);

  return { store, persistor };
}
