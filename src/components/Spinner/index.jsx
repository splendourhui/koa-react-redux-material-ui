import React, { Component } from 'react';
import { CircularProgress } from 'material-ui';

class Spinner extends Component {

  render() {
    let style = {
      display: 'none'
    };
    if (this.props.show) {
      style.display = 'block';
    }
    return (
      <div className='spinner-background' style={style}>
        <div className='spinner'>
          <CircularProgress mode="indeterminate" size={1.5} />
        </div>
      </div>
    );
  }
}

export default Spinner;
