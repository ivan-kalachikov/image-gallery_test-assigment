import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import './index.scss';
import App from './App';
import { imageGalleryReducer, appStateReducer } from './reducers/index';
import './locales/i18n';

const initialState = {
  imageGallery: {
    rawImages: [],
    imageSizes: [],
    width: null,
  },
  appState: {
    url: '',
    error: null,
    status: 'idle',
  },
};

const rootReducer = combineReducers({
  imageGallery: imageGalleryReducer,
  appState: appStateReducer,
});

const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
