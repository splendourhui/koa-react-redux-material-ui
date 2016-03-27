import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

const Paper = require('material-ui/lib/paper');

import Header from '../../components/Header';
import Spinner from '../../components/Spinner';

import { jumpTo } from '../../actions/common';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <Paper id='content' zDepth={1} >
          {this.props.children}
        </Paper>
        <Spinner show={this.props.common.loading} />
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    query: state.router.location.query,
    common: state.common
  }
}

export default connect(mapStateToProps, {
  jumpTo
})(App);
