import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Paper = require('material-ui/lib/paper');

import * as commonActions from '../../actions/common';

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

  componentWillReceiveProps(nextProps) {}

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
    common: state.common
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(commonActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticePage);
