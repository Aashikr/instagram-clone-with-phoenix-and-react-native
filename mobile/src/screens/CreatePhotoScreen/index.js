import React, { PureComponent } from 'react';
import {
  View,
  Image,
  CameraRoll,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Touchable from '@appandflow/touchable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PADDING = 17;
const MARGIN = 10;

const MAX_IMAGE = 20;

const styles = StyleSheet.create({
  root: {},
  imageWrapper: {
    margin: '2.5%',
    width: (Dimensions.get('window').width - PADDING * 2 - MARGIN * 2) / 3,
    height: (Dimensions.get('window').width - PADDING * 2 - MARGIN * 2) / 3,
    borderRadius: 3,
    marginRight: MARGIN,
    marginBottom: MARGIN,
  },
  image: {
    flex: 1,
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    minHeight: '100%',
  },
  imageHover: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

class CreatePhotoScreen extends PureComponent {
  state = {
    loading: false,
    images: [],
    firstQuery: true,
    selected: null,
    endCursor: '',
    hasNextPage: false,
  };

  componentDidMount() {
    this._getPhotos();
  }

  _getPhotos = async after => {
    if (this.state.firstQuery) {
      this.setState({ loading: true });
    }

    const res = await CameraRoll.getPhotos({
      first: MAX_IMAGE,
      after,
    });

    this.setState({
      images: [...this.state.images, ...res.edges],
      firstQuery: false,
      loading: false,
      endCursor: res.page_info.end_cursor,
      hasNextPage: res.page_info.has_next_page,
    });
  };

  _onEndReached = () => {
    if (this.state.hasNextPage) {
      this._getPhotos(this.state.endCursor);
    }
  };

  _onSelect = item => {
    this.setState({ selected: item });
  };

  _renderItem = ({ item }) => {
    const isSelected =
      this.state.selected &&
      this.state.selected.node.image.filename === item.node.image.filename;
    return (
      <Touchable
        feedback="opacity"
        disabled={isSelected}
        onPress={() => this._onSelect(item)}
        style={styles.imageWrapper}
      >
        <Image source={{ uri: item.node.image.uri }} style={styles.image} />
        {isSelected && <View style={styles.imageHover} />}
      </Touchable>
    );
  };

  _keyExtractor = item => item.node.image.filename;

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View>
        <FlatList
          contentContainerStyle={styles.listContent}
          numColumns={3}
          renderItem={this._renderItem}
          data={this.state.images}
          keyExtractor={this._keyExtractor}
          onEndReached={this._onEndReached}
          extraData={this.state}
        />
      </View>
    );
  }
}

export default CreatePhotoScreen;
