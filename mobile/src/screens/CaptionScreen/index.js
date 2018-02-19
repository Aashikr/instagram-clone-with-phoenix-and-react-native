import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Image,
  TextInput,
} from 'react-native';
import Touchable from '@appandflow/touchable';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Divider } from '../../components';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    height: 150,
    flexDirection: 'row',
  },
  imgWrapper: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 100,
    width: 70,
  },
  captionWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionInput: {
    width: '100%',
    paddingVertical: 10,
    paddingRight: 10,
    height: 100,
  },
  listItem: {
    minHeight: 40,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#C1C9D3',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

class CaptionScreen extends PureComponent {
  state = {
    caption: '',
  };

  _onChangeCaption = caption => this.setState({ caption });
  render() {
    return (
      <Touchable
        onPress={Keyboard.dismiss}
        feedback="none"
        native={false}
        style={styles.root}
      >
        <View style={styles.header}>
          <View style={styles.imgWrapper}>
            <Image
              source={{ uri: this.props.image.node.image.uri }}
              style={styles.img}
            />
          </View>
          <View style={styles.captionWrapper}>
            <TextInput
              value={this.state.caption}
              onChangeText={this._onChangeCaption}
              placeholder="Write a caption..."
              multiline
              style={styles.captionInput}
              underlineColorAndroid="rgba(0, 0, 0, 0)"
            />
          </View>
        </View>
        <Divider />
        <Touchable feedback="opacity" style={styles.listItem}>
          <View style={styles.tagList}>
            <Text>Tags</Text>
          </View>
          <Ionicons name="ios-arrow-forward" size={20} color="#C1C9D3" />
        </Touchable>
      </Touchable>
    );
  }
}

export default CaptionScreen;
