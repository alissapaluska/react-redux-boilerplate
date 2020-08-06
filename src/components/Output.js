import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    container: {
        height: '35vh',
        width: '80vw',
        float: 'right',
        display: 'block',
        overflowY: 'scroll',
        overflowX: 'hidden'
    },
    ouput: {
        fontSize: '.7rem',
        fontFamily: 'Monaco',
        wordWrap: 'break-word',
        whiteSpace: 'pre-wrap'
    }
});

class Output extends Component {
    showResponse = () => {
        const { classes } = this.props;
        const { sampleRes, sampleError } = this.props.output;
        const resultOutput = sampleRes.length ==0 ? 'No ouput' : JSON.stringify(sampleRes, null, 2);

        if(sampleError){
            return (<div className={classes.output}> {sampleError} </div>)
        } else {
            return (<div className={classes.output}>{resultOutput} </div>)
        }
    }

    render() {
        const { classes } = this.props;
        return(
            <Grid className={classes.container} container direction="row" justify="flex-start">
                {this.showResponse()}
            </Grid>
        )
    }
}

export default (withStyles(styles)(Output));