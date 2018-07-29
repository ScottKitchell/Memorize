import React from 'react';
import {Platform, Alert, ToastAndroid, StyleSheet, AsyncStorage, Text, View, ScrollView, TextInput, TouchableOpacity, Button} from 'react-native';
import ParsedText from 'react-native-parsed-text';
import Icon from 'react-native-vector-icons/Feather';
import Hashtag from '../components/Hashtag';
import Header from '../components/Header';
import EditMemoryToolbar from '../components/EditMemoryToolbar';

const initialState = {
  tagArray: ['shopping', 'work'],
  memoryText: '',
  memoryTags: [],
  memoryFlags: [],
  memoryFlag: false,
  memoryDone: false,
  memoryForget: false,
  memoryCreatedAt: null
};

type Props = {};
export default class NewMemory extends React.Component<Props> {

  constructor(props){
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    /*AsyncStorage.getItem('tagsArray', (err, data) => {
      if(data) this.setState({'tagsArray': JSON.parse(data)});
    });*/
  }

  render() {
    let tags = this.state.tagArray.map((tag) => {
      return <Hashtag key={tag} tag={tag} onPress={() => this.insertTag(tag) } />
    });

    const parseRules = [
      // {type: 'url',                       style: styles.url, onPress: this.handleUrlPress},
      // {type: 'phone',                     style: styles.phone, onPress: this.handlePhonePress},
      // {type: 'email',                     style: styles.email, onPress: this.handleEmailPress},
      {pattern: /#(\w+)/,                 style: styles.hashtagText},
      {pattern: /!(FLAG|DONE|FORGET)/,    style: styles.metatagText},
    ];

    return (
      <View style={styles.container}>
        <Header closeScreen={() => this.closeScreen()}/>

        <ScrollView style={styles.body} keyboardShouldPersistTaps="handled">
          <View style={styles.memoryInput}>
            <TextInput style={styles.textInput} placeholder="#Call mum back" placeholderTextColor="#CCC" autoFocus={true} multiline={true} underlineColorAndroid="transparent"
              onChangeText={(memoryText) => this.setState({memoryText})}>
              <ParsedText style={styles.text} parse={parseRules} childrenProps={{allowFontScaling: false}}>
                  {this.state.memoryText}
                </ParsedText>
              </TextInput>
          </View>

          <View style={styles.tagContainer}>
            {tags}
          </View>

          <View>

          </View>
        </ScrollView>

        <EditMemoryToolbar flag={this.state.memoryFlag} done={this.state.memoryDone} toggleFlag={() => this.toggleFlag()} toggleDone={() => this.toggleDone()} save={() => this.saveMemory()}/>
      </View>
    );
  }

  saveMemory() {
    if(this.state.memoryText) {
      let memoryArray = [];
      AsyncStorage.getItem('memoryArray', (err, data) => {
        if(data) memoryArray = JSON.parse(data);
        else if(err) Alert.alert(err);

        memoryArray.unshift({
          memory: this.state.memoryText
        });
        AsyncStorage.setItem('memoryArray', JSON.stringify(memoryArray), (err) => {
          if(err) ToastAndroid.showWithGravity('Error saving memory...', ToastAndroid.SHORT, ToastAndroid.CENTER);
          else {
            this.resetState();
            ToastAndroid.showWithGravity('Memory saved', ToastAndroid.SHORT, ToastAndroid.CENTER);
          }
        });
        //this.props.navigation.goBack();
      });
    }
  }

  resetState() {
    this.setState(initialState);
  }

  insertTag(tag) {
    this.setState({
      'memoryText': this.state.memoryText + '#'+tag,
      'memoryTags': [...this.state.memoryTags, tag ]
    });
  }

  toggleFlag(toggleOn = !this.state.memoryFlag) {
    if(toggleOn) {
      this.setState({
        'memoryText': this.state.memoryText + ' !FLAG',
        'memoryFlag': true
      });
    } else {
      let memoryText = this.state.memoryText.replace(/\s?\!FLAG/g,'');
      this.setState({
        'memoryText': memoryText,
        'memoryFlag': false
      });
    }
  }

  toggleDone(toggleOn = !this.state.memoryDone) {
    if(toggleOn) {
      this.setState({
        'memoryText': this.state.memoryText + ' !DONE',
        'memoryDone': true,
      });
    } else {
      let memoryText = this.state.memoryText.replace(/\s?\!DONE/g,'');
      this.setState({
        'memoryText': memoryText,
        'memoryDone': false,
      });
    }
  }

  closeScreen() {
    this.props.navigation.goBack();
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 64,
    //padding: 5
  },
  memoryInput: {
    backgroundColor: '#FFF',
  },
  textInput: {
    alignSelf: 'stretch',
    textAlignVertical: 'top',
    fontSize: 18,
    color: '#555',
    padding: 20,
    paddingBottom: 10,
    minHeight: 100,
    backgroundColor: '#FFF',
  },
  tagContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    padding: 20,
    paddingTop: 0,
    paddingBottom: 10,
    backgroundColor: '#FFF',
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
