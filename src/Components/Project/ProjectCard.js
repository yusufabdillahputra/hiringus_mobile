/**
 * Date : 11/12/2019
 * Time : 17:03
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import moment from 'moment';
import {
  Card,
  CardItem,
  Title,
  Body,
  Text,
  Button,
  Right,
  Left,
} from 'native-base';
import Styling from '../../Global/StyleSheet';

class ProjectCard extends Component {

  render () {
    return (
      <Card
        style={{
          borderRadius: 8,
        }}
      >
        <CardItem
          header
          bordered
          style={{
            backgroundColor: Styling.white.color,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}>
          <Body>
            <Title
              style={{
                color: Styling.primary.color,
              }}
            >{this.props.name}</Title>
          </Body>
        </CardItem>
        <CardItem bordered>
          <Left>
            <Text>
              Expires
            </Text>
          </Left>
          <Body>
            <Text>
              {moment(this.props.deadline, "YYYYMMDD").fromNow()}
            </Text>
          </Body>
        </CardItem>
        <Button
          full
          style={{
            backgroundColor: Styling.primary.color,
          }}
          onPress={
            () => this.props.navigation.navigate('HomeScreen')
          }
        >
          <Text>Detail</Text>
        </Button>
        <CardItem
          style={{
            backgroundColor: Styling.black.color,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            paddingBottom: 0,
          }}
        />
      </Card>
    );
  }
}

export default ProjectCard;
