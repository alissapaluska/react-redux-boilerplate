import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import api from '../middleware/api'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'
// import { translationMessages } from '../i18n';

// const MOUNT_NODE = document.getElementById('root');

// start i18n.js

// const addLocaleData = require('react-intl').addLocaleData; //eslint-disable-line
// const enLocaleData = require('react-intl/locale-data/en');
// const deLocaleData = require('react-intl/locale-data/de');

// const enTranslationMessages = require('../translations/en.json');
// const deTranslationMessages = require('../translations/de.json');

// addLocaleData(enLocaleData);
// addLocaleData(deLocaleData);

// const DEFAULT_LOCALE = 'en';

// // prettier-ignore
// const appLocales = [
//   'en',
//   'de',
// ];

// const formatTranslationMessages = (locale, messages) => {
//   const defaultFormattedMessages =
//     locale !== DEFAULT_LOCALE
//       ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
//       : {};
//   const flattenFormattedMessages = (formattedMessages, key) => {
//     const formattedMessage =
//       !messages[key] && locale !== DEFAULT_LOCALE
//         ? defaultFormattedMessages[key]
//         : messages[key];
//     return Object.assign(formattedMessages, { [key]: formattedMessage });
//   };
//   return Object.keys(messages).reduce(flattenFormattedMessages, {});
// };

// const translationMessages = {
//   en: formatTranslationMessages('en', enTranslationMessages),
//   de: formatTranslationMessages('de', deTranslationMessages),
// };

// end i18n.j

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, api, createLogger()),
      DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer)
    })

    // module.hot.accept(['../i18n', '../containers/App'], () => {
    //   React.unmountComponentAtNode(MOUNT_NODE);
    //   React.render(translationMessages);
    // });
  }

  // if (!window.Intl) {
  //   new Promise(resolve => {
  //     resolve(require('react-intl'));
  //   })
  //     .then(() =>
  //       Promise.all([
  //         import('intl/locale-data/jsonp/en.js'),
  //         import('intl/locale-data/jsonp/de.js'),
  //       ]),
  //     ).then(() => React.render(translationMessages))
  //     .catch(err => {
  //       throw err;
  //     });
  // } else {
  //   React.render(translationMessages);
  // }

  return store
}

export default configureStore
