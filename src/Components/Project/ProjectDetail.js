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
import { FlatGrid } from 'react-native-super-grid';
import {
  Container,
  Header,
  Left,
  Icon,
  Button,
  Content,
  Body,
  Title, CardItem, Text, Card, Fab,
} from 'native-base';
import Styling from '../../Global/StyleSheet';
import LoadingScreen from '../../Global/LoadingScreen';
import EmptyResponse from '../../Global/EmptyResponse';

/**
 * Redux Actions
 */
import { connect } from 'react-redux';
import { readByIdProjectEngineer } from '../../Utils/redux/actions/project/readByIdProjectEngineer';
import moment from 'moment';
import EngineerCard from './EngineerCard';

class ProjectDetail extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isRefresh: false,
      isLoading: true,
      propsProject: null,
      propsEngineer: null,
    };
  }

  async componentDidUpdate (prevProps, prevState) {
    if (prevState.isRefresh !== this.state.isRefresh) {
      await this.setState({
        isRefresh: false,
      });
      await this.getData();
    }
  }

  onRefresh = async event => {
    await this.setState({
      isRefresh: true,
      isLoading: true,
    });
  };

  async componentDidMount () {
    await this.getData();
  }

  async getData () {
    const propsEngineer = await this.setPropsEngineer(this.props.navigation.state.params.propsProject.id_project);
    await this.setState({
      isLoading: false,
      propsProject: this.props.navigation.state.params.propsProject,
      propsEngineer: propsEngineer,
    });
  }

  async setPropsEngineer (idProject) {
    const engineer = await this.props.dispatch(readByIdProjectEngineer(idProject));
    return engineer.value.data.payload.rows;
  }

  render () {
    if (this.state.isLoading) {
      return <LoadingScreen
        color={'skyblue'}
      />;
    } else {
      const {propsProject, propsEngineer} = this.state;
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
                  marginLeft: 14,
                }}
              >
                Detail Project
              </Title>
            </Body>
          </Header>
          <Content
            padder
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
                  backgroundColor: Styling.primary.color,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}>
                <Body>
                  <Title
                    style={{
                      color: Styling.white.color,
                    }}
                  >
                    {propsProject.name_project}
                  </Title>
                </Body>
              </CardItem>
              <CardItem
                bordered
              >
                <Left>
                  <Text>
                    Expires
                  </Text>
                </Left>
                <Body>
                  <Text>
                    {moment(propsProject.deadline_project, 'YYYYMMDD').fromNow()}
                  </Text>
                </Body>
              </CardItem>
              <CardItem
                bordered
              >
                <Left>
                  <Text>
                    Fee
                  </Text>
                </Left>
                <Body>
                  <Text>
                    {
                      new Intl.NumberFormat(['en'],
                        {
                          style: 'currency',
                          currency: 'IDR',
                          currencyDisplay: 'symbol',
                          minimumFractionDigits: 0,
                        }).format(propsProject.fee_project)
                    }
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    Description
                  </Text>
                </Body>
              </CardItem>
              <CardItem
                bordered
              >
                <Body>
                  <Text>
                    {propsProject.description_project}
                  </Text>
                </Body>
              </CardItem>
              <CardItem
                bordered
                style={{
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              >
                <Left
                  style={{
                    flex: 0.45,
                  }}
                />
                <Body
                  style={{
                    flex: 1,
                  }}
                >
                  <Title
                    style={{
                      color: Styling.primary.color,
                    }}
                  >
                    List Engineers
                  </Title>
                </Body>
              </CardItem>
            </Card>
          </Content>
          <Fab
            style={{
              position: 'absolute',
              backgroundColor: Styling.primary.color,
              zIndex: 5
            }}
            position="bottomRight"
            onPress={
              () => this.props.navigation.replace('ProjectEditScreen', {
                propsProject: propsProject,
              })
            }
          >
            <Icon style={Styling.white} type="MaterialCommunityIcons" name="file-document-edit-outline"/>
          </Fab>
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
                  propsEngineer.length > 0
                    ? <FlatGrid
                      items={propsEngineer}
                      renderItem={({item, index}) => (
                        <EngineerCard
                          id={item.id_users}
                          name={item.name_users}
                          image={item.photo_users}
                          status={item.status_project_engineer}
                          navigation={this.props.navigation}
                          key={index}
                        />
                      )}
                    />
                    : <EmptyResponse
                      message={'Engineer empty...'}
                    />

                }
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
    data: state,
  };
};

export default connect(mapStateToProps)(ProjectDetail);
