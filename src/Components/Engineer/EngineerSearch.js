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
  Item,
  Input,
  Body,
  Title
} from 'native-base';
import Styling from '../../Global/StyleSheet';
import LoadingScreen from '../../Global/LoadingScreen';

/**
 * Redux Actions
 */
import { connect } from 'react-redux';
import { readAllProjectSkillEngineer } from '../../Utils/redux/actions/users/readAllProjectSkillEngineer';
import EngineerCard from './EngineerCard';
import EmptySearch from '../../Global/EmptySearch';

class EngineerSearch extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isSearching : false,
      propsEngineer: null,
      searchKeyword: null,
    };
  }

  async componentDidUpdate (prevProps, prevState) {
    if (prevState.isSearching !== this.state.isSearching) {
      const propsEngineer = await this.setPropsEngineer('name_users', this.state.searchKeyword)
      await this.setState({
        isSearching: false,
        propsEngineer: propsEngineer
      })
    }
  }

  async setPropsEngineer (fieldName = null, fieldValue = null) {
    const engineer = await this.props.dispatch(readAllProjectSkillEngineer(fieldName, fieldValue));
    return engineer.value.data.payload;
  }

  async searchHandle () {
    await this.setState({
      isSearching : true
    })
  }

  render () {
    if (this.state.isSearching) {
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
                  () => this.props.navigation.goBack()
                }
              >
                <Icon style={Styling.primary} type="MaterialIcons" name="chevron-left"/>
              </Button>
            </Left>
            <Body>
              <Title style={{
                color: Styling.primary.color,
                marginLeft: 4,
              }}>Search Engineers</Title>
            </Body>
          </Header>
          <Header transparent androidStatusBarColor={Styling.statusBar}>
            <Body>
              <Item rounded>
                <Input
                  style={{
                    paddingLeft: 30
                  }}
                  placeholder='By name.....'
                  onChangeText={
                    async value => {
                      await this.setState({
                        searchKeyword: value,
                      });
                    }
                  }
                />
                <Button
                  transparent
                  onPress={
                    () => this.searchHandle()
                  }
                >
                  <Icon active name='search'/>
                </Button>
              </Item>
            </Body>
          </Header>
          <Content padder>
            {
              this.state.propsEngineer !== null
                ? this.state.propsEngineer.map((item, index) => {
                  return <EngineerCard
                    name={item.engineer.name_users}
                    image={item.engineer.photo_users}
                    projects={item.projects}
                    navigation={this.props.navigation}
                    key={index}
                  />
                })
                : <EmptySearch />
            }
          </Content>
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

export default connect(mapStateToProps)(EngineerSearch);
