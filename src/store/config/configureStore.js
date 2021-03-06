import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from '../reducers/auth';
import apiKeyReducer from '../reducers/api_keys';
import invoiceReducer from '../reducers/invoices';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
import createSagaMiddleware from "redux-saga";
import authSaga from "../sagas/auth";
import apiKeySaga from "../sagas/api_keys";
import invoiceSaga from '../sagas/invoices';
import { connectRouter, routerMiddleware } from 'connected-react-router';

const sagaMiddleware = createSagaMiddleware()

export default (history) => {
  const store = createStore(
    combineReducers({
      router: connectRouter(history),
      auth: authReducer,
      api_keys: apiKeyReducer,
      invoices: invoiceReducer
    }),
    composeEnhancers(applyMiddleware(thunk),
      applyMiddleware(sagaMiddleware),
      applyMiddleware(routerMiddleware(history)))
  );

  sagaMiddleware.run(authSaga)
  sagaMiddleware.run(apiKeySaga)
  sagaMiddleware.run(invoiceSaga)

  return store;
};



