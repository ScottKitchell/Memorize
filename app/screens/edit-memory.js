import React from 'react';
import { Platform, Alert, ToastAndroid, StyleSheet, AsyncStorage, Text, View, ScrollView, TextInput, TouchableOpacity, Button, KeyboardAvoidingView } from 'react-native';
import { SocialTextInput } from 'app/components/generic/social-text';
import { Appbar } from 'react-native-paper';
import { Icon, FontAwesomeIcon, ToggleIcon } from 'app/components/generic/icons';
import { MemoryStore, HashtagStore } from 'app/stores';
import { Colors } from 'app/styles';
import moment from 'moment';
import _ from 'lodash';
import Toolbar from 'app/components/generic/toolbar';


const INITIAL_STATE = {
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
    this.state = INITIAL_STATE;
    this.textInputRef = React.createRef();
  }

  componentDidMount() {
    const id = this.getIdFromRoute();
    if(id) this.setStateWithExistingMemory(id);
  }

  setStateWithExistingMemory = (id) => {
    MemoryStore.get(id).then(memory => {
      this.setState({
        isEditing: true,
        memoryText: memory.text,
        memoryFlag: memory.flag,
        memoryDone: memory.done,
      });
    }).catch(error => {
      this.toast("Memory couldn't be found at this time.");
    });
  }

  getIdFromRoute = () => this.props.navigation.getParam('id', null);

  toggleFlag = () => this.setState({memoryFlag: !this.state.memoryFlag});

  toggleDone = () => this.setState({memoryDone: !this.state.memoryDone});

  saveMemory = () => {
    if(!this.state.memoryText) return;
    MemoryStore.save(this.getMemoryFromState()).then(memory => {
      this.toast('memory saved');
      if (this.state.isEditing)
        this.closeScreen();
      else
        this.resetState()
    }).catch(error => {
      this.toast("Memory couldn't be saved at this time.");
    });
  }

  deleteMemory = () => {
    const id = this.getIdFromRoute()
    MemoryStore.delete(id).then(() => {
      this.closeScreen();
    }).catch(error => {
      this.toast("Memory couldn't be deleted at this time.");
    });
  }

  toast = (message) => {
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.CENTER);
  }

  getMemoryFromState = () => ({
    id: this.getIdFromRoute(),
    text: this.state.memoryText,
    tags: this.getHashtagsInMemory(),
    flag: this.state.memoryFlag,
    done: this.state.memoryDone,
  });

  getHashtagsInMemory = () => {
    const text = this.state.memoryText;
    const regex = /#(\w+)/g;
    const hashtags = _.map(text.match(regex), (tag) => _.toLower(tag));
    return _.uniq(hashtags);
  }

  closeScreen = () => this.props.navigation.goBack();

  resetState = () => this.setState(INITIAL_STATE);

  render() {
    return (
      <View style={styles.container}>
        <HeaderAppbar
          title={this.state.isEditing? "Edit Memory" : "New Memory"}
          onBackPress={() => this.closeScreen()}
          onDeletePress={() => this.deleteMemory()}
          deleteDisabled={!this.state.isEditing}
        />

        <ScrollView style={styles.body}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.memoryInput}>
            <SocialTextInput
              ref={this.textInputRef}
              style={styles.textInput}
              placeholder="What do you want to #remember?"
              placeholderTextColor="#CCC"
              autoFocus={true}
              multiline={true}
              underlineColorAndroid="transparent"
              onHashtagEntering={(tag)=>console.log(`tag: "${tag}"`)}
              value={this.state.memoryText}
              onChangeText={memoryText => this.setState({memoryText})}
              hashtagStyle={{color: Colors.primary.dark}}
              urlStyle={{color: Colors.primary.dark}}
            />
          </View>
          <Appbar style={{backgroundColor:'transparent'}}>
            <Appbar.Action
              icon="check"
              onPress={this.toggleDone}
              size={28}
              color={this.state.memoryDone? Colors.primary.dark : Colors.lightGrey.dark}
            />
            <Appbar.Action
              icon="flag"
              size={28}
              onPress={this.toggleFlag}
              color={this.state.memoryFlag? Colors.primary.dark : Colors.lightGrey.dark}
            />
          </Appbar>
        </ScrollView>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={28}
          contentContainerStyle={styles.mainToolbar}
        >
          <Appbar style={styles.mainToolbarInner}>
            <Appbar.Action
              icon={({size})=>(
                <FontAwesomeIcon name="hashtag" size={18}/>
              )}
              onPress={()=>this.textInputRef.current.insertAtCursor('#')}
              color={Colors.lightGrey.dark}
            />
            <View style={{right:0, justifyContent:'flex-end'}}>
              <Appbar.Action
                icon="save"
                onPress={()=>this.saveMemory()}
                color={Colors.primary.dark}
              />
            </View>
          </Appbar>
        </KeyboardAvoidingView>
      </View>
    );
  }
}


function HeaderAppbar(props) {
  return (
    <Appbar.Header style={styles.appbarHeader}>
      <Appbar.BackAction onPress={props.onBackPress} />
      <Appbar.Content
        title={props.title}
      />
      {!props.deleteDisabled && (
        <Appbar.Action icon="delete" onPress={props.onDeletePress} color={Colors.lightGrey.dark} />
      )}
    </Appbar.Header>
  );
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
    minHeight: 70,
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
  },
  appbarHeader: {
    backgroundColor: Colors.header.light,
    elevation: 0,
  },
  memoryActionbar: {
    height: 56,
    borderTopWidth: 0,
  },
  memoryActionbar: {
    height: 56,
    borderTopWidth: 0,
  },
  mainToolbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 56,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.white.light,
  },
  mainToolbarInner: {
    margin: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white.light,
  }
});
