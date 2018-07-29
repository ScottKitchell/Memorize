import React from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import ParsedText from 'react-native-parsed-text';
import Icon from 'react-native-vector-icons/Feather';

type Props = {};
export default class MemoryListItem extends React.Component<Props> {

  constructor(props){
    super(props);
  }

  render() {
    const parseRules = [
      {type: 'url',                       style: styles.urlText, onPress: this.handleUrlPress},
      // {type: 'phone',                     style: styles.phone, onPress: this.handlePhonePress},
      // {type: 'email',                     style: styles.email, onPress: this.handleEmailPress},
      {pattern: /#(\w+)/,                 style: styles.hashtagText},
      //{pattern: /!(FLAG|DONE|FORGET)/,    style: styles.metatagText},
    ];

    return (
      <View key={this.props.keyval} style={[styles.listItem, this.props.memory.done? styles.done : {}]}>
        <View style={styles.memory}>
          <ParsedText style={styles.memoryText} parse={parseRules} childrenProps={{allowFontScaling: false}}>
            {this.props.memory.text}
          </ParsedText>

          <TouchableOpacity style={styles.memoryDone} onPress={this.props.toggleDone}>
            <Icon name={this.props.memory.done? 'check-square' : 'square'} style={[styles.memoryDoneIcon, this.props.memory.done? styles.selected : {}]}/>
          </TouchableOpacity>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionItem} onPress={this.props.delete}>
            <Icon name="trash" style={styles.icon}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={this.props.edit}>
            <Icon name="edit-3" style={styles.icon}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}  onPress={this.props.toggleFlag}>
            <Icon name="flag" style={[styles.icon, this.props.memory.flag? styles.selected : {}]}/>
          </TouchableOpacity>

          <View style={{flex:1}}>

          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#FFF',
    position: 'relative',
    padding: 2,
    paddingLeft: 2,
    paddingRight: 2,
    //borderRadius: 2,
    //margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    flexDirection: 'column',
  },
  done: {
    backgroundColor: '#F4F4F4',
  },
  memory: {
    flexDirection: 'row',
  },
  memoryText: {
    flex: 1,
    color: '#444',
    fontSize: 18,
    margin: 4,
    padding: 8,
    marginRight: 0,
  },
  memoryDone: {
    margin: 4,
    padding: 8,
  },
  memoryDoneIcon: {
    fontSize: 24,
    color: '#444',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  actionItem: {
    margin: 4,
    marginTop: 0,
    padding: 8,
  },
  icon: {
    fontSize: 20,
    color: '#C0C0C0',
  },
  selected: {
    color: '#DA22FF',
  },
  cardDelete: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    top: 0,
    bottom: 0,
    right: 0,
  },
  cardDeleteText: {
    color: '#555'
  },
  hashtagText: {
    color: '#9733EE',
  },
  urlText: {
    color: '#BBB',
  },
  metatagText: {
    color: '#DDD',
  },
  flagText: {
    color: '#DA22FF',
  }
});
