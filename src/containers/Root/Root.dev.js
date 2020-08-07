import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import DevTools from '../DevTools'
import { Route } from 'react-router-dom'
import App from '../App'
import UserPage from '../UserPage'
import Repos from '../Repos'
// import LanguageProvider from '../LanguageProvider';

const messages = "";

const Root = ({ store }) => (
  <Provider store={store}>
    {/* <LanguageProvider messages={messages}> */}
      <Route path="/" component={App} />
      <Route path="/:login/:name" component={Repos} />
      <Route path="/:login" component={UserPage} />
      <DevTools />
    {/* </LanguageProvider> */}
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root;
