import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        search: ""
      },
    }
  }

  componentDidUpdate = prevProps => {
    if (prevProps.value !== this.props.value) {
      this.setInputValue(this.props.value);
    }
  }

  getInputValue = () => {
    return this.state.formValues.search;
  }

  setInputValue = val => {
    const { formValues } = this.state;
    formValues["search"] = val;
    this.setState({ formValues });
  }

  handleChange = e => {
    e.preventDefault();
    const { formValues } = this.state;
    const { name, value } = e.currentTarget;
    formValues[name] = value;
    this.setState({ formValues });
  }

  handleGoClick = () => {
    this.props.onChange(this.getInputValue());
  }

  render() {
    return (
      <form onSubmit={this.handleGoClick}>
        <TextField
          ref={(input) => this.input = input}
          defaultValue={this.props.value}
          id="search"
          name="search"
          label="search"
          onChange={this.handleChange}
          InputLabelProps={{ style: { fontSize: '.9rem' } }}
          variant="outlined" />
        <Button type="submit" variant="contained" color="primary" onClick={this.handleGoClick}> search </Button>
      </form>
    )
  }
}

Explore.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Explore;