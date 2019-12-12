/**
 * Date : 11/12/2019
 * Time : 12:32
 * @author Yusuf Abdillah Putra <yusufabdillahputra@gmail.com>
 * @license ISC
 */

import React, { Component } from 'react';
import Styling from '../Global/StyleSheet';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  Container,
  Header,
  Left,
  Icon,
  Button,
  Text,
  Content,
  View,
  Body,
  Title,
  Right,
} from 'native-base';
import MenuFooter from '../Global/Menu/MenuFooter';

/**
 * Redux Actions
 */
import { connect } from 'react-redux';
import { readAll } from '../Utils/redux/actions/company/readAll';
import LoadingScreen from '../Global/LoadingScreen';
import EmptyResponse from '../Global/EmptyResponse';
import CompanyCard from '../Components/Company/CompanyCard';

class Company extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isUnauthorized: false,
      isLoading: true,
      propsCompany: null,
    }
  }

  async componentDidMount () {
    const jwt = await this.props.data.Component_Authentication.token;
    if (jwt !== null) {
      const propsCompany = await this.setPropsCompany(jwt);
      await this.setState({
        isUnauthorized: true,
        isLoading: false,
        propsCompany: propsCompany,
      });
    }
    if (jwt === null) {
      this.setState({
        isLoading: false,
        isUnauthorized: false
      })
    }
  }

  async setPropsCompany (jwt = null) {
    const company = await this.props.dispatch(readAll(jwt));
    return company.value.data.payload.rows;
  }

  render () {
    if (this.state.isLoading) {
      return <LoadingScreen color={'skyblue'}/>;
    }
    if (this.state.isUnauthorized === false) {
      return this.props.navigation.navigate('LoginScreen')
    }
    else {
      const { propsCompany } = this.state
      return (
        <Container>
          <Header transparent androidStatusBarColor={Styling.statusBar}>
            <Left />
            <Body>
              <Title style={{
                color: Styling.primary.color,
                marginLeft: 35
              }}>All Company</Title>
            </Body>
            <Right style={{flex: 0.35}}>
              <Button
                iconRight
                transparent
                onPress={
                  () => this.props.navigation.navigate('CompanySearchScreen')
                }
              >
                <Icon style={Styling.primary} type="FontAwesome5" name="search" />
              </Button>
            </Right>
          </Header>
          <Content padder>
            {
              propsCompany.length > 0
                ? propsCompany.map((item, index) => {
                  return <CompanyCard
                    name={item.name_company}
                    image={item.photo_company}
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

export default connect(mapStateToProps)(Company);
