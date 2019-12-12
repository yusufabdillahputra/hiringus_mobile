/**
 * Date : 11/12/2019
 * Time : 17:03
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import { Image } from 'react-native';
import {
  Card,
  CardItem,
  Title,
  Body,
  Text,
  Button,
  Right,
  Left
} from 'native-base';
import Styling from '../../Global/StyleSheet';
import { baseUriApi } from '../../Utils/axios';

class ProfileCard extends Component {

  render () {
    return (
      <Card style={{
        borderRadius: 8
      }}>
        <CardItem header bordered style={{
          backgroundColor: Styling.white.color,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8
        }}>
          <Body>
            <Title
              style={{
                color: Styling.primary.color
              }}
            >Profile Picture</Title>
          </Body>
        </CardItem>
        <CardItem cardBody bordered>
          <Image
            source={{
              uri: `${baseUriApi}/${this.props.role}/${this.props.image}`
            }}
            style={{height: 200, width: null, flex: 1}}
          />
        </CardItem>
        <CardItem
          style={{
            backgroundColor: Styling.black.color,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            paddingBottom: 0
          }}
        />
      </Card>
    );
  }
}

export default ProfileCard;
