/**
 * Date : 11/12/2019
 * Time : 12:30
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
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
      isLoading: true,
      propsEngineer: null,
    };
  }

  async componentDidMount () {
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

  render () {
    const { propsEngineer } = this.state
    if (this.state.isLoading) {
      return <LoadingScreen color={'skyblue'}/>;
    } else {
      return (
        <Container>
          <Header transparent androidStatusBarColor={Styling.statusBar}>
            <Left />
            <Body>
              <Title style={{
                color: Styling.primary.color,
                marginLeft: 35
              }}>All Engineers</Title>
            </Body>
            <Right style={{flex: 0.35}}>
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
          <Content padder>
            {
              propsEngineer.length > 0
                ? propsEngineer.map((item, index) => {
                  return <EngineerCard
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
