/**
 * Date : 11/12/2019
 * Time : 22:36
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import { Alert } from 'react-native'
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
  Item,
  Text,
  DatePicker,
} from 'native-base';
import Styling from '../../Global/StyleSheet';
import LoadingScreen from '../../Global/LoadingScreen';
import { post } from '../../Utils/axios';
import AlertCard from '../../Global/AlertCard';

class ProjectCreate extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isSubmit: false,
      isLoading: true,
      name: null,
      deadline: null,
      createdBy: null,
      showToast: false,
      color: null,
      title: null,
      subTitle: null,
    };
  }

  async alertDanger() {
    await this.setState({
      isLoading: false,
      isSubmit: false,
      showToast: true,
      color: Styling.red.color,
      title: 'Required',
      subTitle: 'All form cannot be empty',
    });
    setTimeout(() => {
      this.setState({
        showToast: false,
        color: null,
        title: null,
        subTitle: null,
      });
    }, 2000);
  }

  async componentDidMount () {
    await this.getData();
  }

  async getData () {
    await this.setState({
      deadline: new Date(),
      isLoading: false,
      createdBy: this.props.navigation.state.params.idUsers,
    });
  }

  async submitHandler () {
    await this.setState({
      isSubmit: true,
      isLoading: true,
    });
    if (this.state.createdBy !== null && this.state.deadline !== null && this.state.name !== null) {
      const responseApi = await post('/project', {
        name_project: this.state.name,
        deadline_project: this.state.deadline,
        created_by: this.state.createdBy
      });
      const responseApiCode = responseApi.data.status;
      if (responseApiCode === 200) {
        await this.setState({
          isLoading: false,
          isSubmit: false,
        })
        await Alert.alert(
          'Success',
          'Create project successfully',
          [
            {
              text: 'Create more',
              style: 'cancel',
            },
            {text: 'Back to list', onPress: () => this.props.navigation.replace('ProjectScreen')},
          ],
          {cancelable: false},
        );
      } else {
        await this.alertDanger()
      }
    } else {
      await this.alertDanger()
    }
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
              <Item
                rounded
                style={{
                  marginTop: 10,
                  backgroundColor: Styling.white.color,
                }}
              >
                <Icon
                  active
                  type='SimpleLineIcons'
                  name='briefcase'
                  style={{
                    paddingLeft: 30,
                  }}
                />
                <Input
                  placeholder='Name Project'
                  onChangeText={
                    async value => {
                      await this.setState({
                        name: value,
                      });
                    }
                  }
                />
              </Item>
              <Item
                rounded
                style={{
                  marginTop: 10,
                  backgroundColor: Styling.white.color,
                }}
              >
                <Icon
                  active
                  type='MaterialCommunityIcons'
                  name='calendar-alert'
                  style={{
                    paddingLeft: 30,
                  }}
                />
                <DatePicker
                  defaultDate={new Date()}
                  minimumDate={new Date()}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText="Select Deadline"
                  textStyle={{color: Styling.primary.color}}
                  placeHolderTextStyle={{color: '#d3d3d3'}}
                  onDateChange={
                    async date => {
                      await this.setState({
                        deadline: date,
                      });
                    }
                  }
                  disabled={false}
                />
                <Text>
                  {this.state.deadline.toString().substr(4, 12)}
                </Text>
              </Item>
              <Button
                rounded
                block
                style={{
                  backgroundColor: Styling.primary.color,
                  marginTop: 20,
                }}
                onPress={
                  () => this.submitHandler()
                }
              >
                <Text>Submit</Text>
              </Button>
            </Form>
            {
              this.state.showToast
                ? <AlertCard
                  marginTop={20}
                  bgColor={this.state.color}
                  title={this.state.title}
                  subTitle={this.state.subTitle}
                />
                : null
            }
          </Content>
        </Container>
      );
    }
  }
}

export default ProjectCreate;
