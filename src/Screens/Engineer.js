/**
 * Date : 11/12/2019
 * Time : 12:30
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import {
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import Styling from '../Global/StyleSheet';
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Content,
  Right,
  Button,
  Icon
} from 'native-base';
import MenuFooter from '../Global/Menu/MenuFooter';
import EngineerCard from '../Components/Engineer/EngineerCard';
import LoadingScreen from '../Global/LoadingScreen';
import EmptyResponse from '../Global/EmptyResponse';

/**
 * Redux Actions
 */
import { connect } from 'react-redux';
import { readAllProjectSkillEngineer } from '../Utils/redux/actions/users/readAllProjectSkillEngineer';

class Engineer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isRefresh: false,
      isLoading: true,
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

  async componentDidMount () {
    await this.getData()
  }

  async getData() {
    const propsEngineer = await this.setPropsEngineer();
    await this.setState({
      isLoading: false,
      propsEngineer: propsEngineer,
    });
  }

  async setPropsEngineer () {
    const engineer = await this.props.dispatch(readAllProjectSkillEngineer());
    return engineer.value.data.payload;
  }

  onRefresh = async event => {
    await this.setState({
      isRefresh: true,
      isLoading: true,
    });
  };

  render () {
    if (this.state.isLoading) {
      return <LoadingScreen color={'skyblue'}/>;
    } else {
      const { propsEngineer } = this.state
      return (
        <Container>
          <Header transparent androidStatusBarColor={Styling.statusBar}>
            <Left
              style={{
                flex: 0.7,
              }}
            />
            <Body
              style={{
                flex: 0,
              }}
            >
              <Title style={{
                color: Styling.primary.color,
                marginLeft: 35
              }}>All Engineers</Title>
            </Body>
            <Right>
              <Button
                iconRight
                transparent
                onPress={
                  () => this.props.navigation.navigate('EngineerSearchScreen')
                }
              >
                <Icon style={Styling.primary} type="FontAwesome5" name="search" />
              </Button>
            </Right>
          </Header>
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
                    ? propsEngineer.map((item, index) => {
                      return <EngineerCard
                        id={item.engineer.id_users}
                        name={item.engineer.name_users}
                        image={item.engineer.photo_users}
                        projects={item.projects}
                        navigation={this.props.navigation}
                        key={index}
                      />
                    })
                    : <EmptyResponse />
                }
              </Content>
            </ScrollView>
          </SafeAreaView>
          <MenuFooter
            navigation={this.props.navigation}
          />
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

export default connect(mapStateToProps)(Engineer);
