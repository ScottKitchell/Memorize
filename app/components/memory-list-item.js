import React from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Swipeout from 'react-native-swipeout';
import ParsedText from 'react-native-parsed-text';
import { Icon, ToggleIcon } from './icons';
import { Colors } from '../scripts/styles';

export default class MemoryListItem extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    memory: PropTypes.object.isRequired,
    onDonePress: PropTypes.func.isRequired,
    onFlagPress: PropTypes.func.isRequired,
    onEditPress: PropTypes.func.isRequired,
    onDeletePress: PropTypes.func.isRequired
  }

  constructor(props){
    super(props);

  }

  renderCheckBox(toggled) {
    return (
      <ToggleIcon color="#ccc" toggledColor={Colors.green} size={24} name="circle" toggledName="check-circle" toggled={toggled} onPress={() => this.props.onDonePress(this.props.id)}/>
    )
  }

  render() {
    const id = this.props.id;
    const memory = this.props.memory;

    const parseRules = [
      {type: 'url',                       style: styles.urlText, onPress: this.handleUrlPress},
      // {type: 'phone',                     style: styles.phone, onPress: this.handlePhonePress},
      // {type: 'email',                     style: styles.email, onPress: this.handleEmailPress},
      {pattern: /#(\w+)/,                 style: styles.hashtagText},
      //{pattern: /!(FLAG|DONE|FORGET)/,    style: styles.metatagText},
    ];

    const leftButtons = [
    //   {
    //   text: 'Done',
    //   backgroundColor: '#88e67c',
    //   onPress: () => this.props.onDonePress(id),
    // },
    {
      text: 'Flag',
      backgroundColor: Colors.secondary,
      onPress: () => this.props.onFlagPress(id),
    },{
      text: 'Edit',
      backgroundColor: Colors.yellow,
      onPress: () => this.props.onEditPress(id),
    }];

    const rightButtons = [{
      text: 'Delete',
      type: 'delete',
      backgroundColor: Colors.secondary,
      onPress: () => this.props.onDeletePress(id, memory.text),
    }];

    return (
      <Swipeout key={this.props.id} style={[styles.container, memory.done? styles.done : {}]} left={leftButtons} right={rightButtons} autoClose={true}>
        <View style={styles.main}>
          <View style={styles.memory}>
            <Text style={styles.memoryText}>{memory.text}</Text>
          </View>
          <View style={styles.actions}>
            {this.renderCheckBox(memory.done)}
          </View>
        </View>
        <View style={styles.extra}>

        </View>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    flexDirection: 'column',
  },
  done: {
    backgroundColor: '#F9F9F9',
  },
  flagged: {
    backgroundColor: '#e5edda',
  },
  selected: {
    color: Colors.aqua,
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    // paddingTop: 16,
    // paddingBottom: 12,
    paddingLeft: 30,
    paddingRight: 30,
  },
  memory: {
    flex: 1,
  },
  memoryText: {
    flex: 1,
    color: Colors.text,
    fontSize: 18,
  },
  acion: {
    width: 20,
    margin: 4,
    padding: 8,
    justifyContent: 'center',
  },
  actionButton: {

  },
  extra: {

  },
  extraFlag: {

  },
  icon: {
    fontSize: 20,
    color: '#C0C0C0',
  }
});
