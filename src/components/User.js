import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

const User = ({ user }) => {
  const { login, avatarUrl, name } = user;
  return (
    <div className="User">
      <Link to={`/${login}`}>
        <img src={avatarUrl} alt={login} width="72" height="72" />
        <Typography paragraph={true} variant={'h5'}>
          {login} {name && '(' + name + ')'}
        </Typography>
      </Link>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    name: PropTypes.string
  }).isRequired
}

export default User;
