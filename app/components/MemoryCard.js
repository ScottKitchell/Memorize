import React from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import ParsedText from 'react-native-parsed-text';

type Props = {};
export default class MemoryCard extends React.Component<Props> {

  constructor(props){
    super(props);
  }

  render() {
    const parseRules = [
      // {type: 'url',                       style: styles.url, onPress: this.handleUrlPress},
      // {type: 'phone',                     style: styles.phone, onPress: this.handlePhonePress},
      // {type: 'email',                     style: styles.email, onPress: this.handleEmailPress},
      {pattern: /#(\w+)/,                 style: styles.hashtagText},
      {pattern: /!(FLAG|DONE|FORGET)/,    style: styles.metatagText},
    ];
    
    return (
      <View key={this.props.keyval} style={styles.card}>
        <ParsedText style={styles.cardText} parse={parseRules} childrenProps={{allowFontScaling: false}}>
          {this.props.memory.text}
        </ParsedText>

        <TouchableOpacity onPress={this.props.deleteMethod} style={styles.cardDelete}>
          <Text style={styles.cardDeleteText}>x</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    //borderRadius: 2,
    //margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  cardText: {
    color: '#555'
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
  metatagText: {
    color: '#DDD',
  },
  flagText: {
    color: '#DA22FF',
  }
});
