"use strict";

import React from 'react';
import {
  AppBar
} from 'material-ui';

class Header extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
  }
  handleLeftIconButtonTouchTap() {
    this.props.toggleLeftNav();
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="app-header">
        <AppBar
          title={`Koa-react-redux-material-ui`}
          onLeftIconButtonTouchTap={this.handleLeftIconButtonTouchTap.bind(this)}
          />
      </div>
    );
  }
}

export default Header;
