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
  Text,
  Content,
  Item,
  Input,
  View, Body, Title, Right,
} from 'native-base';
import Styling from '../../Global/StyleSheet';
import LoadingScreen from '../../Global/LoadingScreen';

/**
 * Redux Actions
 */
import { connect } from 'react-redux';
import { readAll } from '../../Utils/redux/actions/company/readAll';
import CompanyCard from './CompanyCard';
import EmptySearch from '../../Global/EmptySearch';

class CompanySearch extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isSearching: false,
      propsCompany: null,
      searchKeyword: null,
    };
  }

  async componentDidUpdate (prevProps, prevState) {
    if (prevState.isSearching !== this.state.isSearching) {
      const jwt = await this.props.data.Component_Authentication.token;
      const propsCompany = await this.setPropsCompany(jwt, 'name_company', this.state.searchKeyword);
      await this.setState({
        isSearching: false,
        propsCompany: propsCompany,
      });
    }
  }

  async setPropsCompany (jwt = null, fieldName = null, fieldValue = null) {
    const engineer = await this.props.dispatch(readAll(jwt, fieldName, fieldValue));
    return engineer.value.data.payload.rows;
  }

  async searchHandle () {
    await this.setState({
      isSearching: true,
    });
  }

  render () {
    if (this.state.isSearching) {
      return <LoadingScreen
        color={'skyblue'}
      />;
    } else {
      const {propsCompany} = this.state;
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
              }}>Search Company</Title>
            </Body>
          </Header>
          <Header transparent androidStatusBarColor={Styling.statusBar}>
            <Body>
              <Item rounded>
                <Input
                  style={{
                    paddingLeft: 30,
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
              propsCompany !== null
                ? propsCompany.map((item, index) => {
                  return <CompanyCard
                    name={item.name_company}
                    image={item.photo_company}
                    navigation={this.props.navigation}
                    key={index}
                  />;
                })
                : <EmptySearch/>
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

export default connect(mapStateToProps)(CompanySearch);
