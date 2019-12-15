/**
 * Date : 11/12/2019
 * Time : 17:03
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import { Image, TouchableNativeFeedback } from 'react-native';
import {
  Text,
  Card,
  CardItem,
  Body
} from 'native-base';
import Styling from '../../Global/StyleSheet';
import { baseUriApi } from '../../Utils/axios';
import BadgeGlobal from '../../Global/BadgeGlobal';

class EngineerCard extends Component {

  render () {
    return (
      <Card
        bordered
        style={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        <TouchableNativeFeedback
          onPress={
            () => this.props.navigation.replace('EngineerDetailScreen', {
              idUsers: this.props.id,
            })
          }
        >
          <Image
            source={{
              uri: `${baseUriApi}/engineer/${this.props.image}`,
            }}
            style={{
              height: 200,
              width: null,
              flex: 1,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,

            }}
          />
        </TouchableNativeFeedback>
        <CardItem>
          <Body>
            <Text
              style={{
                color: Styling.primary.color,
              }}
            >
              {this.props.name}
            </Text>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <BadgeGlobal
              status={this.props.status}
            />
          </Body>
        </CardItem>
        <CardItem
          bordered
          style={{
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            paddingBottom: 0
          }}
        />
      </Card>
    );
  }
}

export default EngineerCard;
