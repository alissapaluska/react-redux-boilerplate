import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Explore from '../components/Explore'
import { resetErrorMessage } from '../actions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

class App extends Component {
  handleDismissClick = e => {
    e.preventDefault()
    this.props.resetErrorMessage()
  }

  handleChange = nextValue => {
    this.props.history.push(`/${nextValue}`)
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    return (
      !errorMessage ? null :
        <Typography paragraph={true} variant={'body1'} style={{ backgroundColor: '#e99', padding: 10 }}>
          {errorMessage} <Button onClick={this.handleDismissClick}> Dismiss </Button>
        </Typography>
    )
  }

  render() {
    const { children, inputValue } = this.props
    return (
      <div>
        <Typography paragraph={true} variant={'body1'}>Move the DevTools with Ctrl+W or hide them with Ctrl+H.</Typography>
        <Explore value={inputValue} onChange={this.handleChange} />
        <hr />
        {this.renderErrorMessage()}
        {children}
      </div>
    )
  }
}

App.propTypes = {
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  children: PropTypes.node
}

const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.errorMessage,
  inputValue: ownProps.location.pathname.substring(1)
})

export default withRouter(connect(mapStateToProps, { resetErrorMessage })(App));
