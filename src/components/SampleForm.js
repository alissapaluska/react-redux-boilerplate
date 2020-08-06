import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { getSampleService } from '../actions/sample'
import { connect } from 'react-redux'

const styles = theme => ({
    textField: {
        marginBottom: '4%',
        marginLeft: '10%',
        marginTop: '10%'
    }
});

class SampleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {
                baseUrl: "",
                query: "",
                acceptLanguageHeader: ""
            },
            showSample: false
        }
    }

    getResults = (e) => {
        e.preventDefault();
        const { formValues } = this.state;
        const params = {
            query: formValues["query"],
            acceptLanguageHeader: formValues["acceptLanguageHeader"]
        }
        this.props.getSampleService(params);
    }

    handleChange = (e) => {
        e.preventDefault();
        const { formValues } = this.state;
        const { name, value } = e.currentTarget;
        formValues[name] = value;
        this.setState({ formValues });
        this.forceUpdate();
    }

    handleInputs = () => {
        const { classes } = this.props;
        const { formValues } = this.state;
        return(
            <React.Fragment>
                <Grid className={classes.textField}>
                    <TextField
                        ref={(input) => this.input = input}
                        id="query-input-text-field"
                        name="query"
                        label="query"
                        InputLabelProps={{style: {fontSize: '.9rem'}}}
                        value={formValues["query"]}
                        onChange={this.handleChange}
                        variante="outlined"
                    />
                </Grid>
                <Grid className={classes.textField}>
                    <TextField
                        ref={(input) => this.input = input}
                        id="accept-language-header-input-text-field"
                        name="acceptLanguageHeader"
                        label="Accept-Langauge-Header"
                        InputLabelProps={{style: {fontSize: '.9rem'}}}
                        value={formValues["acceptLanguageHeader"]}
                        onChange={this.handleChange}
                        variante="outlined"
                    />
                </Grid>
            </React.Fragment>
        ) 
    }

    render() {
        const { classes } = this.props;
        return(
            <form autoComplete="off" onSubmit={this.getResults}>
                {this.handleInputs()}
                <Grid className={classes.textField}>
                    <Button type="submit" variant="contained" color="primary" onClick={this.getResults}>
                        submit
                    </Button>
                </Grid>
            </form>
        )
    }
}

const mapDispatchToProps = { getSampleService };
const mapStateToProps = (state) => ({
    baseUrl: "test",
});

SampleForm.propTypes = {
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SampleForm));