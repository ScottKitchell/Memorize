import React from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import PropTypes from 'prop-types';
import Swipeout from 'react-native-swipeout';
import ParsedText from 'react-native-parsed-text';
import { Icon, ToggleIcon } from './icons';
import { Colors } from '../scripts/styles';
import moment from 'moment';

export default class MemoryListItem extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    memory: PropTypes.object.isRequired,
    onDonePress: PropTypes.func.isRequired,
    onFlagPress: PropTypes.func.isRequired,
    onEditPress: PropTypes.func.isRequired,
    onDeletePress: PropTypes.func.isRequired
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
        style={[styles.container, memory.done? styles.done : {}]}
        right={rightButtons}
        autoClose={true}
      >
        <TouchableHighlight
          style={styles.main}
          onPress={()=>this.props.onEditPress(id)}
          underlayColor='#cccccc'
        >
          <React.Fragment>
            <View style={styles.leftPanel}>
              <CheckCircle
                checked={memory.done}
                onChange={() => this.props.onDonePress(id)}
              />
            </View>
            <View style={styles.centerPanel}>
              <View style={styles.memoryDate}>
                <Text style={styles.memoryDateText}>
                  {moment(memory.createdAt,'X').fromNow(true)}
                </Text>
              </View>
              <View style={styles.memoryContent}>
                <Text style={styles.memoryContentText}>
                  {memory.text}
                </Text>
              </View>
              <View style={styles.actionStrip}>

              </View>
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
)


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    flexDirection: 'column',
  },
  done: {
    backgroundColor: '#fbfbfb',
  },
  main: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16,
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
    backgroundColor: '#e056fd',
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
    color: '#cccccc'
  },
  memoryContent: {
    alignItems: 'flex-start',
  },
  memoryContentText: {
    color: Colors.text.default,
    fontSize: 16,
  },
  actionStrip: {

  },
});
