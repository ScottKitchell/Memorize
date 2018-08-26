import React from 'react';
import {Platform, Alert, StyleSheet, AsyncStorage, View, ScrollView, FlatList, Text, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import _ from 'lodash';
import MemoryListItem from '../components/MemoryListItem';
import MemoryStore from '../store/memory.store';
import HashtagStore from '../store/hashtag.store';

export default class Memories extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      initialMemoryArray: [],
      memoryArray: [],
      tags: {},
      searchTerm: '',
    }
  }

  componentDidMount() {
    //HashtagStore.nuke();
    //AsyncStorage.removeItem('hashtagsArray');
    //AsyncStorage.removeItem('memoryArray'); // For development only to remove all stored memories
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
      MemoryStore.getAll().then(memories => {
        HashtagStore.getAll().then((tags) => {
          this.setState({'memoryArray': memories, initialMemoryArray: memories, tags});
        });
      });

    });
    this.props.navigation.navigate('EditMemory');
  }

  toggleFlag = (id) => {
    this._toggle(id,'flag');
  }

  toggleDone = (id) => {
    this._toggle(id,'done');
  }

  _toggle = (id,key) => {
    let memoryArray = (Object.assign([], this.state.memoryArray));
    let memory = memoryArray[id];
    memory[key] = !memory[key];
    MemoryStore.update(id, memory);
    this.setState({'memoryArray': memoryArray});
  }

  editMemory = (id) => {
    this.props.navigation.navigate('EditMemory', {id});
  }

  deleteMemory = (id, memoryText) => {
    Alert.alert(
      'Delete this memory?',
      memoryText,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: () => this._deleteMemory(id), style: 'destructive'},
      ],
      { cancelable: false }
    );
  }

  _deleteMemory = (id) => {
    let memoryArray = (Object.assign([], this.state.memoryArray));
    memoryArray.splice(id, 1);
    MemoryStore.delete(id);
    this.setState({'memoryArray': this.state.memoryArray});
  }

  search = (searchTerm) => {
    this.setState({searchTerm});
    const memoryArray = _.filter(this.state.initialMemoryArray, memory => String(memory.text).includes(searchTerm));
    this.setState({memoryArray});
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#FFF" barStyle="dark-content"/>
        <View style={styles.memoryInput}>
          <TextInput style={styles.textInput} placeholder="Search Memories" placeholderTextColor="#CCC" multiline={true} underlineColorAndroid="transparent"
            onChangeText={this.search} value={this.state.searchTerm}>
              {/*<ParsedText><Text style{{color: '#336699'}}>{this.setState({memoryText})}</Text></ParsedText>*/}
          </TextInput>
        </View>
        <View>
          
        </View>

        <FlatList
          style={styles.body}
          data={this.state.memoryArray}
          extraData={this.state}
          renderItem={({item, index}) => (
            <MemoryListItem
              key={index}
              id={index}
              memory={item}
              toggleDone={this.toggleDone}
              toggleFlag={this.toggleFlag}
              edit={this.editMemory}
              delete={this.deleteMemory}
            />
          )}
        />

        <TouchableOpacity style={styles.newButton} onPress={() => this.props.navigation.navigate('EditMemory')} >
          <Icon name="plus" size={18} color='#FFF'/>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memoryInput: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  textInput: {
    alignSelf: 'stretch',
    textAlignVertical: 'top',
    fontSize: 18,
    color: '#555',
    padding: 16,
    backgroundColor: '#FFF'
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 64,
    //padding: 5
  },
  newButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 56,
    width: 56,
    borderRadius: 30,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BA2BF7',
  },
  newButtonText: {
    fontSize: 22,
    color: '#FFF'
  }
});
