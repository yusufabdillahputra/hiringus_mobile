/**
 * Date : 11/12/2019
 * Time : 17:45
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import {
  Spinner,
  Content,
} from 'native-base';

class LoadingContent extends Component {
  render () {
    return (
      <Content padder>
        <Spinner style={{marginTop: 250}} color={this.props.color} />
      </Content>
    );
  }
}

export default LoadingContent;
