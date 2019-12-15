/**
 * Date : 11/12/2019
 * Time : 22:36
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import {
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { post } from '../../Utils/axios';
import {
  Container,
  Header,
  Left,
  Right,
  Icon,
  Button,
  Content,
  Text,
  Body,
  Title,
  Card,
  CardItem,
  Item,
  Picker,
  Form,
} from 'native-base';
import Styling from '../../Global/StyleSheet';
import LoadingScreen from '../../Global/LoadingScreen';
import BadgeGlobal from '../../Global/BadgeGlobal';

/**
 * Redux Actions
 */
import { connect } from 'react-redux';
import { readAllProjectSkillEngineer } from '../../Utils/redux/actions/users/readAllProjectSkillEngineer';
import { readByCreatedBy } from '../../Utils/redux/actions/project/readByCreatedBy';
import { baseUriApi } from '../../Utils/axios';
import { Image } from 'react-native';
import jwtDecode from 'jwt-decode';
import AlertCard from '../../Global/AlertCard';

class EngineerDetail extends Component {
  constructor (props) {
    super(props);

    this.state = {
      idRefresh: false,
      isSubmit: false,
      isLoading: true,
      propsEngineer: null,
      propsProject: null,
      project: null,
      showToast: false,
      color: null,
      title: null,
      subTitle: null,
    };
  }

  async componentDidUpdate (prevProps, prevState) {
    if (prevState.isSubmit !== this.state.isSubmit) {
      const jwt = this.props.auth.token;
      const decode = await jwtDecode(jwt);
      const idUsers = await decode.id_users;
      const body = {
        id_project: this.state.project,
        id_engineer: this.state.propsEngineer.engineer.id_engineer,
        created_by: idUsers,
      };
      const responseApi = await post('/project/engineer', body, jwt);
      if (responseApi.data.status === 200) {
        await this.onRefresh();
      } else {
        await this.setState({
          isLoading: false,
          isSubmit: false,
          showToast: true,
          color: '#d50000',
          title: 'Error',
          subTitle: 'Hire not success...',
        });
        setTimeout(() => {
          this.props.navigation.replace('EngineerDetailScreen', {
            idUsers: this.state.propsEngineer.engineer.id_users,
          });
        }, 2000);
      }
    }
    if (prevState.isRefresh !== this.state.isRefresh) {
      await this.setState({
        isRefresh: false,
      });
      await this.getData();
    }
  }

  async componentDidMount () {
    await this.getData();
  }

  async getData () {
    const jwt = await this.props.auth;
    if (jwt.isFulfilled) {
      const idUsers = await this.props.navigation.state.params.idUsers;
      const propsEngineer = await this.setPropsEngineer(idUsers);
      const propsProject = await this.setPropsProject(jwt.token);
      this.setState({
        isLoading: false,
        propsEngineer: propsEngineer,
        propsProject: propsProject.payload.rows,
      });
    } else {
      this.props.navigation.replace('EngineerScreen');
    }
  }

  async setPropsEngineer (idUsers) {
    const engineer = await this.props.dispatch(readAllProjectSkillEngineer('id_users', idUsers));
    return engineer.value.data.payload[0];
  }

  async setPropsProject (jwt) {
    const project = await this.props.dispatch(readByCreatedBy(jwt));
    return project.value.data;
  }

  async handleHire () {
    await this.setState({
      isSubmit: true,
      isLoading: true,
    });
  }

  onRefresh = async event => {
    await this.setState({
      isRefresh: true,
      isLoading: true,
    });
  };

  render () {
    if (this.state.isLoading) {
      return <LoadingScreen
        color={'skyblue'}
      />;
    } else {
      const {propsEngineer, propsProject} = this.state;
      return (
        <Container>
          <Header transparent androidStatusBarColor={Styling.statusBar}>
            <Left>
              <Button
                iconLeft
                transparent
                onPress={
                  () => this.props.navigation.replace('EngineerScreen')
                }
              >
                <Icon style={Styling.primary} type="MaterialIcons" name="chevron-left"/>
              </Button>
            </Left>
            <Body>
              <Title style={{
                color: Styling.primary.color,
                marginLeft: 12,
              }}>Detail Engineer</Title>
            </Body>
          </Header>
          <Image
            source={{
              uri: `${baseUriApi}/engineer/${propsEngineer.engineer.photo_users}`,
            }}
            style={{height: 200, width: null, resizeMode: 'stretch'}}
          />
          <SafeAreaView
            style={{
              flex: 1,
            }}
          >
            <ScrollView
              style={{
                flex: 1,
              }}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefresh}
                  onRefresh={this.onRefresh}
                  progressViewOffset={0}
                />
              }
            >
              <Content padder>
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

                <Card
                  style={{
                    borderRadius: 8,
                  }}
                >
                  <CardItem
                    bordered
                    header
                    style={{
                      backgroundColor: Styling.white.color,
                      borderTopRightRadius: 8,
                      borderTopLeftRadius: 8,
                    }}
                  >
                    <Title
                      style={Styling.primary}
                    >
                      Hiring Engineer
                    </Title>
                  </CardItem>
                  <Form>
                    <Item
                      picker
                      style={{
                        backgroundColor: Styling.white.color,
                      }}
                    >
                      <Picker
                        mode="dropdown"
                        selectedValue={this.state.project}
                        onValueChange={
                          async value => {
                            await this.setState({
                              project: value,
                            });
                          }
                        }
                      >
                        <Picker.Item label="Select your project" value="0"/>
                        {
                          propsProject.length > 0
                            ? propsProject.map((item, index) => {
                              return <Picker.Item label={item.name_project} value={item.id_project} key={index}/>;
                            })
                            : null
                        }
                      </Picker>
                    </Item>
                    <Button
                      full
                      style={{
                        borderBottomRightRadius: 8,
                        borderBottomLeftRadius: 8,
                        backgroundColor: Styling.primary.color,
                      }}
                      onPress={
                        () => this.handleHire()
                      }
                    >
                      <Text>Hire</Text>
                    </Button>
                  </Form>
                </Card>

                <Card
                  style={{
                    borderRadius: 8,
                  }}
                >
                  <CardItem
                    bordered
                    header
                    style={{
                      backgroundColor: Styling.primary.color,
                      borderTopRightRadius: 8,
                      borderTopLeftRadius: 8,
                    }}
                  >
                    <Title>
                      {propsEngineer.engineer.name_users}
                    </Title>
                  </CardItem>
                  <CardItem bordered>
                    <Left>
                      <Title
                        style={{
                          color: Styling.primary.color,
                        }}
                      >
                        List Project
                      </Title>
                    </Left>
                    <Right>
                      <Text>
                        {propsEngineer.projects.length}
                      </Text>
                    </Right>
                  </CardItem>
                  {
                    propsEngineer.projects.length > 0
                      ? propsEngineer.projects.map((item, index) => {
                        return <CardItem key={index}>
                          <Body>
                            <Text>
                              {item.name_project}
                            </Text>
                          </Body>
                          <Right>
                            <BadgeGlobal
                              status={item.status_project_engineer}
                            />
                          </Right>
                        </CardItem>;
                      })
                      : null
                  }
                  <CardItem bordered>
                    <Left>
                      <Title
                        style={{
                          color: Styling.primary.color,
                        }}
                      >
                        List Skill
                      </Title>
                    </Left>
                    <Right>
                      <Text>
                        {propsEngineer.skills.length}
                      </Text>
                    </Right>
                  </CardItem>
                  {
                    propsEngineer.skills.length > 0
                      ? propsEngineer.skills.map((item, index) => {
                        return <CardItem
                          key={index}
                        >
                          <Body>
                            <Text>
                              {item.name_skill}
                            </Text>
                          </Body>
                        </CardItem>;
                      })
                      : null
                  }
                  <CardItem
                    header
                    style={{
                      backgroundColor: Styling.white.color,
                      borderBottomRightRadius: 8,
                      borderBottomLeftRadius: 8,
                      paddingBottom: 0,
                    }}
                  />
                </Card>
              </Content>
            </ScrollView>
          </SafeAreaView>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.Component_Authentication,
    engineer: state
  };
};

export default connect(mapStateToProps)(EngineerDetail);
