import React from 'react';
import {Platform, Alert, ToastAndroid, StyleSheet, AsyncStorage, Text, View, ScrollView, TextInput, TouchableOpacity, Button} from 'react-native';
import ParsedText from 'react-native-parsed-text';
import Icon from 'react-native-vector-icons/Feather';
import Hashtag from '../components/Hashtag';

type Props = {};
export default class NewMemory extends React.Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      tagArray: ['shopping', 'work'],
      memoryText: '',
      memoryTags: [],
      memoryFlags: [],
      memoryFlagSet: false,
      memoryDoneSet: false,
      memoryForgetSet: false,
      memoryCreatedAt: null
    }
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
      {type: 'url',                       style: styles.url, onPress: this.handleUrlPress},
      {type: 'phone',                     style: styles.phone, onPress: this.handlePhonePress},
      {type: 'email',                     style: styles.email, onPress: this.handleEmailPress},
      {pattern: /#(\w+)/,                 style: styles.hashtag},
      {pattern: /!(FLAG|DONE|FORGET)/,    style: styles.metatag},
    ];

    return (
      <View style={styles.container}>
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
        </ScrollView>

        <View style={styles.toolbar} keyboardShouldPersistTaps="handled">
          <View style={{width:90}}>
            <TouchableOpacity style={styles.closeButton} onPress={this.closeScreen.bind(this)} >
              <Icon name="x" size={18} />
            </TouchableOpacity>
          </View>
          <View style={{flex:1}}>
            <Text style={styles.title}>New memory</Text>
          </View>
          <View style={{width:90}}>
            <TouchableOpacity style={styles.saveButton} onPress={this.addMemory.bind(this)} >
              <Text style={styles.saveButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  addMemory() {
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
            this.setState({memoryText: ''});
            ToastAndroid.showWithGravity('Memory saved', ToastAndroid.SHORT, ToastAndroid.CENTER);
          }
        });
        //this.props.navigation.goBack();
      });
    }
  }

  insertTag(tag) {
    this.setState({
      'memoryText': this.state.memoryText + '#'+tag,
      'memoryTags': [...this.state.memoryTags, tag ]
    });
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
  toolbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    padding: 4,
    paddingLeft: 12,
    paddingRight: 12,
  },
  memoryInput: {
    paddingTop: 10,
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
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 64,
    //padding: 5
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
  saveButton: {
    padding: 8,
    alignSelf: 'flex-end',
  },
  saveButtonText: {
    color: '#BA2BF7',
    fontSize: 18,
  },
  closeButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  title: {
    padding: 8,
    alignSelf: 'center',
    fontSize: 18,
  },
  hashtag: {
    color: '#9733EE',
  },
  metatag: {
    color: '#DDD',
  },
  flag: {
    color: '#DA22FF',
  }
});
