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
    let content;
    if (!this.props.children) {
      //TODO
    } else {
      content = this.props.children;
    }

    return (
      <div>
        <Header />
        <Paper id='content' zDepth={1} >
          {content}
        </Paper>
        <Spinner show={this.props.loading} />
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    query: state.router.location.query,
    loading: state.loading,
    messages: state.messages
  }
}

export default connect(mapStateToProps, {
  jumpTo
})(App);
