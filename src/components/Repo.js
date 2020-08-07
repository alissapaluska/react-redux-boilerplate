import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

const Repo = ({ repo, owner }) => {
  const { login } = owner;
  const { name, description } = repo;

  return (
    <React.Fragment className="Repo">
      <Typography paragraph={true} variant={'body2'}>
        <Link to={`/${login}/${name}`}> {name} </Link> by <Link to={`/${login}`}> {login} </Link>
      </Typography>
      { description && <Typography paragraph={true} variant={'caption'}>{description}</Typography> }
    </React.Fragment>
  )
}

Repo.propTypes = {
  repo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  owner: PropTypes.shape({
    login: PropTypes.string.isRequired
  }).isRequired
}

export default Repo;
