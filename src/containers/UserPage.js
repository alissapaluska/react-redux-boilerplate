import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadUser, loadStarred } from '../actions'
import User from '../components/User'
import Repo from '../components/Repo'
import List from '../components/List'
import zip from 'lodash/zip'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  user: {
    marginBottom: '4%',
    marginLeft: '2%',
    marginTop: '2%'
  },
  userList: {
    marginBottom: '4%',
    marginLeft: '2%',
    marginTop: '2%'
  }
});

class UserPage extends Component {
  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.login !== this.props.login) {
      this.loadData();
    }
  }

  loadData = () => {
    const { loadUser, loadStarred, login } = this.props;
    loadUser(login, ['name']);
    loadStarred(login);
  }

  handleLoadMoreClick = () => {
    this.props.loadStarred(this.props.login, true);
  }

  renderRepo([repo, owner]) {
    return (
      <Repo
        repo={repo}
        owner={owner}
        key={repo.fullName} />
    )
  }

  render() {
    const { classes, user, login, starredRepos, starredRepoOwners, starredPagination } = this.props;
    return (
      !user ?
        <Typography paragraph={true} variant={'h3'}>Loading {login}'s profile...</Typography> :
        <React.Fragment>
          <Grid className={classes.user}>
            <User user={user} />
            </Grid>
            <Grid className={classes.userList}>
            <List renderItem={this.renderRepo}
              items={zip(starredRepos, starredRepoOwners)}
              onLoadMoreClick={this.handleLoadMoreClick}
              loadingLabel={`Loading ${login}'s starred...`}
              {...starredPagination} />
          </Grid>
        </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    pagination: { starredByUser },
    entities: { users, repos }
  } = state;
  const login = ownProps.match.params.login.toLowerCase();
  const starredPagination = starredByUser[login] || { ids: [] };
  const starredRepos = starredPagination.ids.map(id => repos[id]);

  return {
    login,
    starredRepos,
    starredRepoOwners: starredRepos.map(repo => users[repo.owner]),
    starredPagination,
    user: users[login]
  }
}

UserPage.propTypes = {
  login: PropTypes.string.isRequired,
  user: PropTypes.object,
  starredPagination: PropTypes.object,
  starredRepos: PropTypes.array.isRequired,
  starredRepoOwners: PropTypes.array.isRequired,
  loadUser: PropTypes.func.isRequired,
  loadStarred: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, { loadUser, loadStarred })(withStyles(styles)(UserPage)));
