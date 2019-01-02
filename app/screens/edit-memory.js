import React from 'react';
import { Platform, Alert, ToastAndroid, StyleSheet, AsyncStorage, Text, View, ScrollView, TextInput, TouchableOpacity, Button } from 'react-native';
import { Icon, ToggleIcon } from 'app/components/generic/icons';
import Header from 'app/components/header';
import EditMemoryToolbar from 'app/components/edit-memory-toolbar';
import { MemoryStore, HashtagStore } from 'app/stores';
import { Colors } from 'app/styles';
import moment from 'moment';
import { forEach } from 'lodash';


const initialState = {
  isEditing: false,
  topHashtags: [],
  memoryText: '',
  memoryTags: [],
  memoryFlags: [],
  memoryFlag: false,
  memoryDone: false,
  memoryCreatedAt: null,
  memoryUpdatedAt: null,
};


export default class EditMemoryScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id', -1);
    if(id>=0) {
      MemoryStore.get(id).then(memory => {
        this.setState({
          isEditing: true,
          memoryId: memory.id,
          memoryText: memory.text,
          memoryFlag: memory.flag,
          memoryDone: memory.done,
        });
      });
    }
    // HashtagStore.all().then((topHashtags) => {
    //   console.log('topHashtags',topHashtags);
    //   this.setState({topHashtags});
    // });
  }

  saveMemory() {
    if(!this.state.memoryText) return;
    const tags = this.state.memoryText.match(/#(\w+)/g);
    let memory = {
      text: this.state.memoryText,
      tags: this.getHashtagsFromText(this.state.memoryText),
      triggers: ["22-2222"],
      flag: this.state.memoryFlag,
      done: this.state.memoryDone,
    };

    if(this.state.isEditing) {
      console.log('update memory',memory);
      const {id} = this.props.navigation.state.params;
      memory.id = id;
    } else {
      console.log('save new memory',memory);
    }
    MemoryStore.save(memory).then(()=>{
      this.savedToast();
      this.closeScreen();
    }).catch((err)=>{
      console.error(err);
      Alert.alert("That didn't save... try again.");
    });
  }

  getHashtagsFromText = (text) => {
    const regex = /#(\w+)/g;
    const hashtags = _.map(text.match(regex), (tag) => _.toLower(tag));
    return _.uniq(hashtags);
  }

  savedToast(){
    ToastAndroid.showWithGravity('Memory saved', ToastAndroid.SHORT, ToastAndroid.CENTER);
  }

  resetState() {
    this.setState(initialState);
  }

  insertTag(tag) {
    this.setState({
      memoryText: this.state.memoryText + '#'+tag,
      memoryTags: [...this.state.memoryTags, tag]
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
    return (
      <View style={styles.container}>
        <Header
          title={this.state.isEditing? "Edit Memory" : "New Memory"}
          goBack={() => this.closeScreen()}
        />

        <ScrollView style={styles.body} keyboardShouldPersistTaps="handled">
          <View style={styles.memoryInput}>
            <TextInput
              style={styles.textInput}
              placeholder="#Call mum back"
              placeholderTextColor="#CCC"
              autoFocus={true}
              multiline={true}
              underlineColorAndroid="transparent"
              returnKeyLabel={'done'}
              value={this.state.memoryText}
              onChangeText={memoryText => this.setState({memoryText})}
            />
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
