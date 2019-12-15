/**
 * Date : 11/12/2019
 * Time : 22:36
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import {
  Container,
  Header,
  Left,
  Icon,
  Button,
  Content,
  Body,
  Title,
  Form,
  Input,
  Item
} from 'native-base';
import Styling from '../../Global/StyleSheet';
import LoadingScreen from '../../Global/LoadingScreen';

class ProjectCreate extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isSubmit: false,
      isLoading: true,
      name: null,
      deadline: null,
      createdBy: null
    };
  }

  async componentDidUpdate (prevProps, prevState) {
    if (prevState.isSubmit !== this.state.isSubmit) {
      const responseApi = '';
      await this.setState({
        isLoading: false,
        isSubmit: false
      })
    }
  }

  async componentDidMount () {
    await this.getData();
  }

  async getData () {
    await this.setState({
      isLoading: false,
      createdBy: this.props.navigation.state.params.idUsers,
    });
  }

  async submitHandler () {
    await this.setState({
      isSubmit: true,
      isLoading: true
    })
  }

  render () {
    if (this.state.isLoading) {
      return <LoadingScreen
        color={'skyblue'}
      />;
    } else {
      return (
        <Container>
          <Header transparent androidStatusBarColor={Styling.statusBar}>
            <Left>
              <Button
                iconLeft
                transparent
                onPress={
                  () => this.props.navigation.replace('ProjectScreen')
                }
              >
                <Icon style={Styling.primary} type="MaterialIcons" name="chevron-left"/>
              </Button>
            </Left>
            <Body>
              <Title
                style={{
                  color: Styling.primary.color,
                  marginLeft: 13,
                }}
              >
                Create Project
              </Title>
            </Body>
          </Header>
          <Content
            padder
          >
            <Form>

            </Form>
          </Content>
        </Container>
      );
    }
  }
}
export default ProjectCreate;
