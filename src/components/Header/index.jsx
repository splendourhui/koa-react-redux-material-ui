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

  componentWillUnmount() {}

  render() {
    return (
      <div className="app-header">
        <AppBar
          title="Koa-react-redux-material-ui"
          showMenuIconButton={false}
        />
      </div>
    );
  }
}

export default Header;
