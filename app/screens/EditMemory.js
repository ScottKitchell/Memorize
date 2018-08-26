import React from 'react';
import {Platform, Alert, ToastAndroid, StyleSheet, AsyncStorage, Text, View, ScrollView, TextInput, TouchableOpacity, Button} from 'react-native';
import ParsedText from 'react-native-parsed-text';
import Icon from 'react-native-vector-icons/Feather';
import Hashtag from '../components/Hashtag';
import Header from '../components/Header';
import EditMemoryToolbar from '../components/EditMemoryToolbar';
import {pushMemory, getMemory, updateMemory} from '../store/memory.store';
import {hashtagsIn} from '../scripts/hashtags';

const initialState = {
  tagArray: ['shopping', 'work'],
  memoryText: '',
  memoryTags: [],
  memoryFlags: [],
  memoryFlag: false,
  memoryDone: false,
  memoryCreatedAt: null
};

type Props = {};
export default class NewMemory extends React.Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      ...initialState,
      isEditing: false
    };
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id', -1);
    if(id>=0) {
      this.setState({isEditing: true});
      getMemory(id).then(memory => {
        this.setState({
          memoryText: memory.text,
          memoryFlag: memory.flag,
          memoryDone: memory.done,
          memoryCreatedAt: memory.createdAt,
        });
      });
    }
  }

  saveMemory() {
    if(!this.state.memoryText) return;
    let memory = {
      text: this.state.memoryText,
      tags: hashtagsIn(this.state.memoryText),
      flags: [],
      flag: this.state.memoryFlag,
      done: this.state.memoryDone,
      archive: false,
      createdAt: new Date()
    };
    if(this.state.isEditing) {
      const {id} = this.props.navigation.state.params;
      memory.id = id;
      updateMemory(id, memory).then(()=>{
        this.savedToast();
        this.closeScreen();
      }).catch((err)=>{
        Alert.alert(err);
      });
    } else {
      pushMemory(memory).then(()=>{
        this.savedToast();
        this.resetState();
      }).catch((err)=>{
        Alert.alert(err);
      });
    }

  }

  savedToast(){
    ToastAndroid.showWithGravity('Memory saved', ToastAndroid.SHORT, ToastAndroid.CENTER);
  }

  resetState() {
    this.setState(initialState);
  }

  insertTag(tag) {
    this.setState({
      'memoryText': this.state.memoryText + '#'+tag,
      'memoryTags': [...this.state.memoryTags, tag]
    });
  }

  toggleFlag(toggleOn = !this.state.memoryFlag) {
    this.setState({
      'memoryFlag': toggleOn
    });
  }

  toggleDone(toggleOn = !this.state.memoryDone) {
    this.setState({
      'memoryDone': toggleOn
    });
  }

  closeScreen() {
    this.props.navigation.goBack();
  }

  render() {
    let tags = this.state.tagArray.map((tag) => {
      return <Hashtag key={tag} tag={tag} onPress={() => this.insertTag(tag) } />
    });

    const parseRules = [
      {type: 'url',                       style: styles.url, onPress: this.handleUrlPress},
      // {type: 'phone',                     style: styles.phone, onPress: this.handlePhonePress},
      // {type: 'email',                     style: styles.email, onPress: this.handleEmailPress},
      {pattern: /#(\w+)/,                 style: styles.hashtagText},
    ];

    return (
      <View style={styles.container}>
        <Header
          title={this.state.isEditing? "Edit Memory" : "New Memory"}
          goBack={() => this.closeScreen()}
        />

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
    color: '#444',
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
