/**
 * Date : 11/12/2019
 * Time : 17:03
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import { put } from '../../Utils/axios'
import moment from 'moment';
import {
  Card,
  CardItem,
  Title,
  Body,
  Container,
  Text,
  Button,
  Content,
  Right,
  Left, Icon, Header,
} from 'native-base';
import Styling from '../../Global/StyleSheet';
import LoadingScreen from '../../Global/LoadingScreen';

class ProjectOption extends Component {

  constructor (props) {
    super(props);

    this.state = {
      isLoading: true,
      idProjectEngineer: null,
      updatedBy : null,
      jwt: null
    }
  }

  async componentDidMount () {
    const params = await this.props.navigation.state.params;
    await this.setState({
      isLoading: false,
      idProjectEngineer: params.idProjectEngineer,
      updatedBy: params.updatedBy,
      jwt: params.jwt
    })
  }

  async acceptHandler() {
    const body = {
      status_project_engineer: 1,
      updated_by: this.state.updatedBy
    }
    const responseApi = await put(`/project/engineer/id/${this.state.idProjectEngineer}`, body, this.state.jwt)
    if (responseApi.data.status === 200) {
      await this.props.navigation.replace('ProfileScreen')
    }
  }

  async declineHandler() {
    const body = {
      status_project_engineer: 3,
      updated_by: this.state.updatedBy
    }
    const responseApi = await put(`/project/engineer/id/${this.state.idProjectEngineer}`, body, this.state.jwt)
    if (responseApi.data.status === 200) {
      await this.props.navigation.replace('ProfileScreen')
    }
  }

  render () {
    if (this.state.isLoading) {
      return <LoadingScreen
        color={'skyblue'}
      />
    } else {
      return (
        <Container>
          <Header transparent androidStatusBarColor={Styling.statusBar}>
            <Left>
              <Button
                iconLeft
                transparent
                onPress={
                  () => this.props.navigation.replace('ProfileScreen')
                }
              >
                <Icon style={Styling.primary} type="MaterialIcons" name="chevron-left"/>
              </Button>
            </Left>
            <Body>
              <Title style={{
                color: Styling.primary.color,
                marginLeft: 15,
              }}>Project Option</Title>
            </Body>
          </Header>
          <Content padder>
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
                  >{this.props.navigation.state.params.name}</Title>
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
                    {moment(this.props.navigation.state.params.deadline, "YYYYMMDD").fromNow()}
                  </Text>
                </Body>
              </CardItem>
              <Button
                full
                style={{
                  backgroundColor: Styling.green.color,
                }}
                onPress={
                  () => this.acceptHandler()
                }
              >
                <Text>Accept</Text>
              </Button>
              <Button
                full
                style={{
                  backgroundColor: Styling.red.color,
                }}
                onPress={
                  () => this.declineHandler()
                }
              >
                <Text>Decline</Text>
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
          </Content>
        </Container>
      );
    }
  }
}

export default ProjectOption;
