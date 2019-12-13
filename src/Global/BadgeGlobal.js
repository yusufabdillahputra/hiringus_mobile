/**
 * Date : 11/12/2019
 * Time : 17:45
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import {
  Badge,
  Text
} from 'native-base';

class BadgeGlobal extends Component {
  render () {
    if (this.props.status === 0) {
      return <Badge warning>
        <Text>
          Process
        </Text>
      </Badge>;
    }
    if (this.props.status === 1) {
      return <Badge success>
        <Text>
          Accept
        </Text>
      </Badge>;
    }
    if (this.props.status === 2) {
      return <Badge info>
        <Text>
          Done
        </Text>
      </Badge>;
    }
    if (this.props.status === 3) {
      return <Badge danger>
        <Text>
          Decline
        </Text>
      </Badge>;
    }
  }
}

export default BadgeGlobal;
