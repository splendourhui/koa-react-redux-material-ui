import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

const RaisedButton = require('material-ui/lib/raised-button');
const Paper = require('material-ui/lib/paper');
const LeftNav = require('material-ui/lib/left-nav');

import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import Message from '../../components/Message';

import { jumpTo } from '../../actions/common';

class App extends Component {
  constructor(props) {
    super(props);
  }

  toggleLeftNav() {
    this.refs.leftNav.toggle();
  }

  handleLeftNavChange(e,index,item) {
    this.props.jumpTo(item.url, item.text);
  }

  render() {
    let content;
    if (!this.props.children) {
      //TODO: 未知路径时展示内容
    } else {
      content = this.props.children;
    }

    let menuItems = [
      {
        url: '/page/index',
        text: 'index page'
      }
    ];

    return (
      <div>
        <Header toggleLeftNav={this.toggleLeftNav.bind(this)}/>
        <Paper id='content' zDepth={1} >
          {content}
        </Paper>
        <Spinner show={this.props.loading} />
        <Message show={this.props.messages.show} message={this.props.messages.message}/>
        <LeftNav
          ref="leftNav"
          docked={false}
          menuItems={menuItems}
          onChange={this.handleLeftNavChange.bind(this)}
          />
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
