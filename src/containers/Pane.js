import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Pane extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>Test</h1>
            </React.Fragment>
        )
    }
}

Pane.propTypes = {
    output: PropTypes.object
}

export default Pane;