import React from 'react';
import {StyleSheet, ToastAndroid, Text, View, TouchableHighlight, TouchableOpacity, Linking} from 'react-native';
import PropTypes from 'prop-types';
import Swipeout from 'react-native-swipeout';
import {SocialText} from './generic/social-text';
import {Icon, ToggleIcon} from './generic/icons';
import {Colors} from 'app/styles';
import moment from 'moment';
import {Appbar} from 'react-native-paper';

export default class MemoryListItem extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    memory: PropTypes.object.isRequired,
    onDonePress: PropTypes.func.isRequired,
    onFlagPress: PropTypes.func.isRequired,
    onEditPress: PropTypes.func.isRequired,
    onDeletePress: PropTypes.func.isRequired,
  }

  openUrl = (url) => {
    Linking.openURL(url).catch(() => (
      ToastAndroid.showWithGravity(`Could not open URL`, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    ));
  }

  render() {
    const id = this.props.id;
    const memory = this.props.memory;

    const rightButtons = [{
      text: 'Delete',
      type: 'delete',
      backgroundColor: Colors.red.light,
      onPress: () => this.props.onDeletePress(id, memory.text),
    }];

    return (
      <Swipeout
        key={id}
        style={styles.container}
        right={rightButtons}
        autoClose={true}
      >
        <TouchableHighlight
          style={styles.main}
          onPress={()=>this.props.onEditPress(id)}
          underlayColor='#eeeeee'
        >
          <React.Fragment>
            <View style={styles.leftPanel}>
              <CheckCircle
                checked={false}
                // onChange={() => this.props.onDonePress(id)}
              />
            </View>
            <View style={styles.centerPanel}>
              <View style={styles.memoryDate}>
                <Text style={styles.memoryDateText}>
                  {moment(memory.createdAt, 'X').fromNow()}
                </Text>
              </View>
              <View style={styles.memoryContent}>
                <SocialText
                  style={[styles.memoryContentText, memory.done && {opacity: 0.3}]}
                  hashtagStyle={{color: Colors.primary.dark}}
                  urlStyle={{color: Colors.primary.dark}}
                  onHashtagPress={this.props.onHashtagPress}
                  onUrlPress={this.openUrl}
                  >
                  {memory.text}
                </SocialText>
              </View>
              <Appbar style={styles.actionStrip}>
                <Appbar.Action
                  icon="check"
                  onPress={()=>this.props.onDonePress(memory.id)}
                  size={22}
                  color={memory.done? Colors.primary.light : Colors.lightGrey.dark}
                />
                <Appbar.Action
                  icon="flag"
                  size={22}
                  onPress={()=>this.props.onFlagPress(memory.id)}
                  color={memory.flag? Colors.primary.light : Colors.lightGrey.dark}
                />
              </Appbar>
            </View>
          </React.Fragment>
        </TouchableHighlight>
      </Swipeout>
    );
  }
}

const CheckCircle = (props) => (
  <TouchableOpacity
    // background={TouchableNativeFeedback.Ripple('#bbbbbb')}
    onPress={() => props.onChange(!props.checked)}
    style={[styles.checkCircle, props.checked && styles.checkedCircle]}
  >
    <Text></Text>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    flexDirection: 'column',
  },
  main: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  leftPanel: {
    width: 56,
  },
  checkCircle: {
    width: 44,
    height: 44,
    backgroundColor: '#eeeeee',
    borderRadius: 22,
  },
  checkedCircle: {
    backgroundColor: Colors.primary.light,
  },
  centerPanel: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  memoryDate: {
    color: Colors.text.default,
    fontSize: 12,
    alignItems: 'flex-start',
  },
  memoryDateText: {
    fontSize: 10,
    color: '#cccccc',
  },
  memoryContent: {
    alignItems: 'flex-start',
  },
  memoryContentText: {
    color: Colors.text.default,
    fontSize: 16,
    lineHeight: 20,
  },
  actionStrip: {
    backgroundColor: 'transparent',
    height: 36,
  },
});
