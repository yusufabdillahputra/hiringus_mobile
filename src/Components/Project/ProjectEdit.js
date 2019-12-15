/**
 * Date : 11/12/2019
 * Time : 22:36
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import { Alert } from 'react-native';
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
  Textarea
} from 'native-base';
import Styling from '../../Global/StyleSheet';
import LoadingScreen from '../../Global/LoadingScreen';
import { put } from '../../Utils/axios';
import AlertCard from '../../Global/AlertCard';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode'

class ProjectEdit extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isSubmit: false,
      isLoading: true,
      idProject: null,
      name: null,
      description: null,
      deadline: null,
      fee: null,
      showToast: false,
      color: null,
      title: null,
      subTitle: null,
    };
  }

  async componentDidUpdate (prevProps, prevState) {
    if (prevState.isSubmit !== this.state.isSubmit) {
      await this.setState({
        isLoading: false,
        isSubmit: false,
      });
    }
  }

  async alertDanger () {
    await this.setState({
      isLoading: false,
      isSubmit: false,
      showToast: true,
      color: Styling.red.color,
      title: 'Required',
      subTitle: 'Some form cannot be empty',
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
      isLoading: false,
      idProject: this.props.navigation.state.params.propsProject.id_project,
      name: this.props.navigation.state.params.propsProject.name_project,
      description: this.props.navigation.state.params.propsProject.description_project,
      deadline: new Date(this.props.navigation.state.params.propsProject.deadline_project),
      fee: this.props.navigation.state.params.propsProject.fee_project,
    });
    await console.log(this.state)
  }

  async submitHandler () {
    await this.setState({
      isSubmit: true,
      isLoading: true,
    });
    const jwt = await this.props.data.token;
    const decode = await jwtDecode(jwt)
    const body = {
      name_project: this.state.name,
      description_project: this.state.description,
      deadline_project: this.state.deadline,
      fee_project: this.state.fee,
      updated_by: decode.id_users,
    };
    const responseApi = await put(`/project/id/${this.state.idProject}`, body, jwt);
    await console.log(responseApi)
    const responseApiCode = responseApi.data.status;
    if (responseApiCode === 200) {
      await Alert.alert(
        'Success',
        'Edit project successfully',
        [
          {
            text: 'Edit more',
            style: 'cancel',
          },
          {
            text: 'Back to list', onPress: () => this.props.navigation.replace('ProjectDetailScreen', {
              propsProject: this.props.navigation.state.params.propsProject
            }),
          },
        ],
        {cancelable: false},
      );
    } else {
      await this.alertDanger();
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
                  () => this.props.navigation.replace('ProjectDetailScreen',{
                    propsProject: this.props.navigation.state.params.propsProject
                  })
                }
              >
                <Icon style={Styling.primary} type="MaterialIcons" name="chevron-left"/>
              </Button>
            </Left>
            <Body>
              <Title
                style={{
                  color: Styling.primary.color,
                  marginLeft: 25,
                }}
              >
                Edit Project
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
                  defaultValue={this.state.name}
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
                  defaultDate={this.state.deadline}
                  minimumDate={this.state.deadline}
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
              <Item
                rounded
                style={{
                  marginTop: 10,
                  backgroundColor: Styling.white.color,
                }}
              >
                <Icon
                  active
                  type='FontAwesome5'
                  name='money-bill'
                  style={{
                    paddingLeft: 30,
                  }}
                />
                <Input
                  placeholder='Fee (Rp.)'
                  defaultValue={this.state.fee}
                  onChangeText={
                    async value => {
                      await this.setState({
                        fee: value,
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
                  type='MaterialIcons'
                  name='description'
                  style={{
                    paddingLeft: 30,
                  }}
                />
              <Textarea
                rowSpan={5}
                placeholder="Description Project"
                defaultValue={this.state.description}
                onChangeText={
                  async value => {
                    await this.setState({
                      description: value,
                    });
                  }
                }
              />
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

const mapStateToProps = state => {
  return {
    data: state.Component_Authentication,
  };
};

export default connect(mapStateToProps)(ProjectEdit);
