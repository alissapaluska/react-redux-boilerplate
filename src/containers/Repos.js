import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadRepo, loadStargazers } from '../actions'
import Repo from '../components/Repo'
import User from '../components/User'
import List from '../components/List'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  repos: {
    marginBottom: '4%',
    marginLeft: '10%',
    marginTop: '10%'
  }
});

class Repos extends Component {
  componentDidMount = () => {
    this.loadData();
  }

  componentDidUpdate = prevProps => {
    if (prevProps.fullName !== this.props.fullName) {
      this.loadData();
    }
  }

  loadData = () => {
    const { fullName, loadRepo, loadStargazers } = this.props;
    loadRepo(fullName, ['description']);
    loadStargazers(fullName);
  }

  handleLoadMoreClick = () => {
    this.props.loadStargazers(this.props.fullName, true);
  }

  renderUser = user => {
    return (
      <User user={user} key={user.login} />
    )
  }

  handleLoading = () => {
    const { repo, owner, name } = this.props;
    if (!repo || !owner) {
      return (
        <Typography paragraph={true} variant={'h3'}>Loading {name} details..</Typography>
      )
    }
  }

  render() {
    const { classes, repo, owner, name, stargazers, stargazersPagination } = this.props;
    this.handleLoading();

    return (
      <React.Fragment>
        <Grid className={classes.repos}>
          <Repo
            repo={repo}
            owner={owner} />
        </Grid>
        <Grid className={classes.repos}>
          <List
            renderItem={this.renderUser}
            items={stargazers}
            onLoadMoreClick={this.handleLoadMoreClick}
            loadingLabel={`Loading stargazers of ${name}...`}
            {...stargazersPagination} />
        </Grid>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // We need to lower case the login/name due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const login = ownProps.match.params.login.toLowerCase()
  const name = ownProps.match.params.name.toLowerCase()
  const fullName = `${login}/${name}`;
  const {
    pagination: { stargazersByRepo },
    entities: { users, repos }
  } = state
  const stargazersPagination = stargazersByRepo[fullName] || { ids: [] };

  return {
    fullName,
    name,
    stargazers: stargazersPagination.ids.map(id => users[id]),
    stargazersPagination,
    repo: repos[fullName],
    owner: users[login]
  }
}

Repos.propTypes = {
  repo: PropTypes.object,
  fullName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  owner: PropTypes.object,
  stargazers: PropTypes.array.isRequired,
  stargazersPagination: PropTypes.object,
  loadRepo: PropTypes.func.isRequired,
  loadStargazers: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, { loadRepo, loadStargazers })(withStyles(styles)(Repos)));
