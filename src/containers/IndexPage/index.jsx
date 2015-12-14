import React, { Component } from 'react';
import { connect } from 'react-redux';

const Paper = require('material-ui/lib/paper');

import { showLoading, showErrorMessage, jumpTo } from '../../actions/common';

class NoticePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.showLoading();
    setTimeout(() => {
      this.props.showErrorMessage('test message');
    }, 3000);
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <div className="index-page">
        <div className="page-header">
          <h1>Hello Index Page</h1>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps, {
  jumpTo,
  showLoading,
  showErrorMessage
})(NoticePage);
