import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

class List extends Component {
  renderLoadMore() {
    const { isFetching, onLoadMoreClick } = this.props;
    return (
      <Button fullWidth={true} style={{ fontSize: '0.9rem' }} onClick={onLoadMoreClick} disabled={isFetching}>
        {isFetching ? 'Loading...' : 'Load More'}
      </Button>
    )
  }

  handleEndResults = () => {
    const { nextPageUrl, items } = this.props;
    const isLastPage = !nextPageUrl;
    const isEmpty = items.length === 0;

    if (isEmpty && isLastPage) {
      return (
        <Typography paragraph={true} variant={'body2'}>End of Results</Typography>
      )
    }
  }

  handleLoadingLabel = () => {
    const { isFetching, items, loadingLabel } = this.props;
    const isEmpty = items.length === 0;

    if (isEmpty && isFetching) {
      return (
        <Typography paragraph={true} variant={'body2'}>{loadingLabel}</Typography>
      )
    }
  }

  render() {
    const { pageCount, items, renderItem, nextPageUrl } = this.props
    const isLastPage = !nextPageUrl;
    this.handleLoadingLabel();
    this.handleEndResults();

    return (
      <div>
        {items.map(renderItem)}
        {pageCount > 0 && !isLastPage && this.renderLoadMore()}
      </div>
    )
  }
}

List.propTypes = {
  loadingLabel: PropTypes.string.isRequired,
  pageCount: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onLoadMoreClick: PropTypes.func.isRequired,
  nextPageUrl: PropTypes.string
}

List.defaultProps = {
  isFetching: true,
  loadingLabel: 'Loading...'
};

export default List;