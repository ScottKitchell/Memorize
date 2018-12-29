import React from 'react';
import {Platform, Alert, StyleSheet, AsyncStorage, View, ScrollView, FlatList, Text, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import _ from 'lodash';
import MemoryListItem from '../components/memory-list-item';
import MemoryStore from '../store/memory.store';
import HashtagStore from '../store/hashtag.store';
import { Colors } from '../scripts/styles';

export default class Memories extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initialMemories: [],
      memories: [],
      tags: {},
      searchTerm: '',
    }
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', () => {
      MemoryStore.get().then(memories => {
        console.log('memories',memories);
        HashtagStore.get().then((tags) => {
          this.setState({'memories': memories, initialMemories: memories, tags});
        });
      });
    });
    this.props.navigation.navigate('EditMemory');
  }

  toggleFlag = (id) => this.toggle(id,'flag');

  toggleDone = (id) => this.toggle(id,'done');

  toggle = (id, key) => {
    let memories = _.clone(this.state.memories);
    let memory = _.find(memories, {id});
    memory[key] = !memory[key];
    MemoryStore.update(id, memory).then(() => {
      this.setState({memories});
    });
  }

  editMemory = (id) => {
    this.props.navigation.navigate('EditMemory', {id});
  }

  deleteMemory = (id, memoryText) => {
    const memoryRemoval = (id) => {
      let memories = (Object.assign([], this.state.memories));
      memories.splice(id, 1);
      MemoryStore.delete(id);
      this.setState({'memories': this.state.memories});
    };
    Alert.alert(
      'Delete this memory?',
      memoryText,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: () => memoryRemoval(id), style: 'destructive'},
      ],
      { cancelable: false }
    );
  }

  search = _.throttle((searchTerm) => {
    MemoryStore.search(searchTerm).then(memories => {
      this.setState({memories});
    });
  }, 600);

  renderMemory = ({item, index}) => (
    <MemoryListItem
      id={item.id}
      memory={item}
      onDonePress={this.toggleDone}
      onFlagPress={this.toggleFlag}
      onEditPress={this.editMemory}
      onDeletePress={this.deleteMemory}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.header.dark} barStyle="light-content"/>
        <View style={styles.memoryInput}>
          <TextInput style={styles.textInput} placeholder="Search Memories" placeholderTextColor="#CCC" multiline={true} underlineColorAndroid="transparent"
            onChangeText={this.search} />
        </View>
        <View>

        </View>

        <FlatList
          style={styles.body}
          data={this.state.memories}
          extraData={this.state}
          keyExtractor={item => String(item.id)}
          renderItem={this.renderMemory}
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
    backgroundColor: Colors.primary.light,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    padding: 12,
  },
  textInput: {
    alignSelf: 'stretch',
    textAlignVertical: 'top',
    fontSize: 18,
    color: Colors.text.onDark.default,
    padding: 6,
    paddingLeft: 10,
    backgroundColor: Colors.overlay.light,
    borderRadius: 3,
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
    borderRadius: 28,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary.light,
  },
  newButtonText: {
    fontSize: 22,
    color: '#FFF'
  }
});
