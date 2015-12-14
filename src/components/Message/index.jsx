"use strict";

import React from 'react';

const Snackbar = require('material-ui/lib/snackbar');

class Message extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {}

  componentWillUnmount() {}

  componentWillReceiveProps(nextProps) {
    if(nextProps.show) {
      this.refs.snackbar.show();
    }
  }

  handleAction() {
    this.refs.snackbar.dismiss();
  }

  render() {
    return (
      <div className="message">
        <Snackbar
          ref='snackbar'
          message={this.props.message}
          action='close'
          autoHideDuration={10000}
          onActionTouchTap={this.handleAction.bind(this)}
          />
      </div>
    );
  }
}

export default Message;
