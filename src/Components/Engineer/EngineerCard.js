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
  Left,
} from 'native-base';
import Styling from '../../Global/StyleSheet';
import { baseUriApi } from '../../Utils/axios';
import LoadingContent from '../../Global/LoadingContent';

class EngineerCard extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isLoading: true,
      totalProjects: 0,
      successRate: 0,
    };
  }

  async componentDidMount () {
    const formula = await this.formulaSuccessRate(this.props.projects);
    await this.setState({
      isLoading: false,
      totalProjects: formula.projectAll,
      successRate: formula.result,
    });
  }

  formulaSuccessRate (projects) {
    const projectOffer = [];
    const projectDone = [];
    const projectAccept = [];
    // eslint-disable-next-line array-callback-return
    projects.map(project => {
      if (project.status_project_engineer === 0) {
        projectOffer.push(project.id_project_engineer);
      }
      if (project.status_project_engineer === 1) {
        projectAccept.push(project.id_project_engineer);
      }
      if (project.status_project_engineer === 2) {
        projectDone.push(project.id_project_engineer);
      }
    });
    return {
      result: ((projectDone.length) / projectAccept.length) * 100 || 0,
      projectAll: projects.length,
      projectOffer: projectOffer.length,
      projectAccept: projectAccept.length,
      projectDone: projectDone.length,
    };
  }

  render () {
    if (this.state.isLoading) {
      return <LoadingContent
        color={'skyblue'}
      />;
    } else {
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
          <CardItem cardBody bordered>
            <Image
              source={{
                uri: `${baseUriApi}/engineer/${this.props.image}`,
              }}
              style={{height: 200, width: null, flex: 1}}
            />
          </CardItem>
          <CardItem bordered>
            <Left>
              <Text>
                Project
              </Text>
            </Left>
            <Body>
              <Text>
                {this.state.totalProjects}
              </Text>
            </Body>
          </CardItem>
          <CardItem bordered>
            <Left>
              <Text>
                Success Rate
              </Text>
            </Left>
            <Body>
              <Text>
                {this.state.successRate}%
              </Text>
            </Body>
          </CardItem>
          <Button
            full
            style={{
              backgroundColor: Styling.primary.color,
            }}
            onPress={
              () => this.props.navigation.replace('EngineerDetailScreen', {
                idUsers: this.props.id
              })
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
}

export default EngineerCard;
