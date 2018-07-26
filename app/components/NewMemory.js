import React from 'react';
import {Platform, StyleSheet, AsyncStorage, Text, View, ScrollView, TextInput, TouchableOpacity, Button} from 'react-native';
import Hashtag from './Hashtag';

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

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.saveButton} onPress={ this.addMemory.bind(this) } >
            <Text style={styles.saveButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.body}>
          <View style={styles.memoryInput}>
            <TextInput style={styles.textInput} placeholder="Remember" placeholderTextColor="#CCC" autoFocus={true} multiline={true} underlineColorAndroid="transparent"
              onChangeText={(memoryText) => this.setState({memoryText})} value={this.state.memoryText}></TextInput>
          </View>
          <View style={styles.tagContainer}>
            {tags}
          </View>
        </ScrollView>
      </View>
    );
  }

  addMemory() {
    if(this.state.memoryText) {
      let d = new Date();
      this.setState({'memoryArray': this.state.memoryArray, memoryText: ''});
      AsyncStorage.setItem('memoryArray', JSON.stringify(this.state.memoryArray));
    }
  }

  insertTag(tag) {
    this.setState({
      'memoryText': this.state.memoryText + '#'+tag,
      'memoryTags': [...this.state.memoryTags, tag ]
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 4,
  },
  memoryInput: {
    backgroundColor: '#FFF',
  },
  textInput: {
    alignSelf: 'stretch',
    textAlignVertical: 'top',
    fontSize: 16,
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
    height: 34,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5b10b0',
    borderRadius: 17,
  },
  saveButtonText: {
    color: '#FFF',
  },
  newButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 64,
    width: 64,
    borderRadius: 50,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5b10b0',
  },
  newButtonText: {
    fontSize: 22,
    color: '#FFF'
  }
});
