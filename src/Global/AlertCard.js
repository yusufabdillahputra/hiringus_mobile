/**
 * Date : 11/12/2019
 * Time : 17:45
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import {
  Title,
  CardItem,
  Left,
  Body,
  Card,
} from 'native-base';

class AlertCard extends Component {
  render () {
    return (
      <Card
        style={{
          borderRadius: 8,
          marginTop: this.props.marginTop
        }}
      >
        <CardItem
          header
          bordered
          style={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            backgroundColor: this.props.bgColor,
          }}
        >
          <Left>
            <Body>
              <Title>{this.props.title}</Title>
              <Title>
                {this.props.subTitle}
              </Title>
            </Body>
          </Left>
        </CardItem>
      </Card>
    );
  }
}

export default AlertCard;
