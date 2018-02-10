import React, { PureComponent, Fragment } from 'react';
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  View,
  RefreshControl,
  StatusBar,
} from 'react-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Feather from 'react-native-vector-icons/Feather';

import { PhotoCard } from '../../components';
import { FeedsPhotoFragment } from './fragments';
import { iconsMap } from '../../utils/themes';

const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class FeedsScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };

    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    this.props.navigator.setButtons({
      leftButtons: [
        {
          id: 'camera',
          icon: iconsMap.camera,
          buttonColor: 'white',
        },
      ],
    });
  }

  onNavigatorEvent(event: any) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'camera') {
        this.props.navigator.showModal({
          screen: 'instagramclone.CreatePhotoScreen',
          title: 'Choose a photo',
          passProps: {},
          animationType: 'slide-up',
        });
      }
    }
  }

  _keyExtractor = item => item.id;

  _renderItem = ({ item }) => <PhotoCard data={item} />;

  _refreshRequest = async () => {
    this.setState({ isRefreshing: true });
    await this.props.data.refetch();
    this.setState({ isRefreshing: false });
  };

  render() {
    if (this.props.data.loading) {
      return (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <FlatList
          data={this.props.data.photos}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._refreshRequest}
            />
          }
        />
      </Fragment>
    );
  }
}

const getPhotos = gql`
  query {
    photos {
      ...feedsPhoto
    }
  }
  ${FeedsPhotoFragment}
`;

export default graphql(getPhotos)(FeedsScreen);
