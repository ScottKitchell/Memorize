import React from 'react'
import { ToastAndroid, StyleSheet, Text, View, ScrollView, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native'
import { SocialTextInput } from 'app/components/generic/social-text'
import { Appbar } from 'react-native-paper'
import { FontAwesomeIcon } from 'app/components/generic/icons'
import { MemoryStore, HashtagStore } from 'app/stores'
import { Colors } from 'app/styles'
import _ from 'lodash'
import Toolbar from 'app/components/generic/toolbar'
import Screen from 'app/components/screen'


const INITIAL_STATE = {
  isEditing: false,
  hashtagEntered: null,
  hashtagSuggestions: [],
  memoryText: '',
  memoryTags: [],
  memoryFlags: [],
  memoryFlag: false,
  memoryDone: false,
  memoryCreatedAt: null,
  memoryUpdatedAt: null,
}


export default class EditMemoryScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = INITIAL_STATE
    this.textInputRef = React.createRef()
  }

  componentDidMount() {
    const id = this.getIdFromRoute()
    if(id) this.setStateWithExistingMemory(id)
  }

  setStateWithExistingMemory = (id) => {
    MemoryStore.get(id).then(memory => {
      this.setState({
        isEditing: true,
        memoryText: memory.text,
        memoryFlag: memory.flag,
        memoryDone: memory.done,
      })
    }).catch(error => {
      this.toast("Memory couldn't be found at this time.")
    })
  }

  getIdFromRoute = () => this.props.navigation.getParam('id', null);

  getMemoryFromState = () => ({
    id: this.getIdFromRoute(),
    text: this.state.memoryText,
    tags: this.getHashtagsInMemory(),
    flag: this.state.memoryFlag,
    done: this.state.memoryDone,
  });

  getHashtagsInMemory = () => {
    const text = this.state.memoryText
    const regex = /#(\w+)/g
    const hashtags = _.map(text.match(regex), (tag) => _.toLower(tag))
    return _.uniq(hashtags)
  }

  handleChangeText = (memoryText) => {
    this.setState({ memoryText })
  }

  handleHashtagEntering = (hashtagEntered) => {
    this.searchHashtags(hashtagEntered)
  }

  searchHashtags = (tag = this.state.hashtagEntered) => {
    if(typeof tag !== 'string')
      this.setState({ hashtagSuggestions:[] })
    HashtagStore.search(tag).then((hashtagSuggestions) => {
      // console.log(`searchHashtags - "${tag}" found ${hashtagSuggestions.length} results`);
      this.setState({ hashtagSuggestions })
    })
  }

  insertHashtag = (tag) => this.textInputRef.current.autoCompleteWord("#" + tag);

  saveMemory = () => {
    if(!this.state.memoryText) return
    MemoryStore.save(this.getMemoryFromState()).then(memory => {
      this.toast('memory saved')
      if (this.state.isEditing)
        this.closeScreen()
      else
        this.resetState()
    }).catch(error => {
      this.toast("Memory couldn't be saved at this time.")
    })
  }

  deleteMemory = () => {
    const id = this.getIdFromRoute()
    MemoryStore.delete(id).then(() => {
      this.closeScreen()
    }).catch(error => {
      this.toast("Memory couldn't be deleted at this time.")
    })
  }

  toggleFlag = () => this.setState({ memoryFlag: !this.state.memoryFlag });

  toggleDone = () => this.setState({ memoryDone: !this.state.memoryDone });

  toast = (message) => {
    ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.CENTER)
  }

  resetState = () => this.setState(INITIAL_STATE);

  closeScreen = () => this.props.navigation.goBack();

  render() {
    // if(this.state.hashtagSuggestions.length > 0)
      // console.log(`hashtagSuggestions -`, this.state.hashtagSuggestions);
    return (
      <Screen>
        <HeaderAppbar
          title={this.state.isEditing ? "Edit Memory" : "New Memory"}
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
              placeholder="#Call mum back"
              placeholderTextColor="#CCC"
              autoFocus={true}
              multiline={true}
              underlineColorAndroid="transparent"
              onHashtagEntering={this.handleHashtagEntering}
              value={this.state.memoryText}
              onChangeText={this.handleChangeText}
              hashtagStyle={{ color: Colors.primary.dark }}
              urlStyle={{ color: Colors.primary.dark }}
            />
          </View>
          <Appbar style={{ backgroundColor:'transparent' }}>
            <Appbar.Action
              icon="check"
              onPress={this.toggleDone}
              size={28}
              color={this.state.memoryDone ? Colors.primary.dark : Colors.lightGrey.dark}
            />
            <Appbar.Action
              icon="flag"
              size={28}
              onPress={this.toggleFlag}
              color={this.state.memoryFlag ? Colors.primary.dark : Colors.lightGrey.dark}
            />
          </Appbar>
          <View style={styles.hashtagSuggestions}>
            {this.state.hashtagSuggestions.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.hashtagSuggestion}
                onPress={() => this.insertHashtag(item.tag)}
              >
                <Text style={styles.hashtagSuggestionText} numberOfLines={1}>
                  #{item.tag}
                </Text>
                {/* <Text style={styles.hashtagSuggestionTextSmall} numberOfLines={1}>
                  Used in {item.count} {(item.count===1)? 'memory':'memories'}
                </Text> */}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={24}
          contentContainerStyle={styles.mainToolbar}
        >
          <Appbar style={styles.mainToolbarInner}>
            <Appbar.Action
              icon={({ size }) => (
                <FontAwesomeIcon name="hashtag" size={18}/>
              )}
              onPress={() => this.textInputRef.current.insertAtCursor('#')}
              color={Colors.lightGrey.dark}
            />
            <View style={{ right:0, justifyContent:'flex-end' }}>
              <Appbar.Action
                icon="save"
                onPress={() => this.saveMemory()}
                color={Colors.primary.dark}
              />
            </View>
          </Appbar>
        </KeyboardAvoidingView>
      </Screen>
    )
  }
}


function HeaderAppbar(props) {
  return (
    <Appbar.Header style={styles.appbarHeader}>
      <Appbar.Action icon="close" onPress={props.onBackPress} />
      <Appbar.Content
        title={props.title}
      />
      {!props.deleteDisabled && (
        <Appbar.Action icon="delete" onPress={props.onDeletePress} color={Colors.lightGrey.dark} />
      )}
    </Appbar.Header>
  )
}


const styles = StyleSheet.create({
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
    lineHeight: 22,
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
  },
  hashtagSuggestions: {
    marginTop: 8,
    marginBottom: 8,
  },
  hashtagSuggestion: {
    height: 56,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: Colors.border,
    paddingLeft: 16,
    paddingRight: 16,
  },
  hashtagSuggestionText: {
    color: Colors.text.default,
    fontSize: 16,
    fontWeight: '400',
  },
  hashtagSuggestionTextSmall: {
    color: Colors.deepGrey.light,
    fontSize: 12,
  },
})
