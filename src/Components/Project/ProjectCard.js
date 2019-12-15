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
  Icon,
  Left,
} from 'native-base';
import Styling from '../../Global/StyleSheet';
import { TouchableNativeFeedback } from 'react-native';

class ProjectCard extends Component {

  render () {
    return (
      <TouchableNativeFeedback
        onPress={
          () => this.props.navigation.replace('ProjectDetailScreen', {
            propsProject: this.props.propsProject
          })
        }
      >
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
            iconLeft
            full
            style={{
              backgroundColor: Styling.primary.color,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}
            onPress={
              () => this.props.navigation.replace('ProjectDetailScreen', {
                propsProject: this.props.propsProject
              })
            }
          >
            <Icon type='FontAwesome5' name='book' />
            <Text>Detail</Text>
          </Button>
        </Card>
      </TouchableNativeFeedback>
    );
  }
}

export default ProjectCard;
