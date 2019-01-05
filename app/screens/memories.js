import React from 'react';
import {Platform, Alert, StyleSheet, AsyncStorage, View, ScrollView, FlatList, Text, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import _ from 'lodash';
import MemoryListItem from 'app/components/memory-list-item';
import { MemoryStore, HashtagStore } from 'app/stores';
import { Colors } from 'app/styles';
import { FAB } from 'react-native-paper';

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
      MemoryStore.all().then(memories => {
        console.log('memories',memories);
        this.setState({'memories': memories, initialMemories: memories, tags: []});
        // HashtagStore.all().then((tags) => {
        //   this.setState({'memories': memories, initialMemories: memories, tags});
        // });
      });
    });
    this.props.navigation.navigate('EditMemory');
  }

  toggleFlag = (id) => this.toggle(id,'flag');

  toggleDone = (id) => this.toggle(id,'done');

  toggle = (id, attr) => {
    const memories = _.clone(this.state.memories);
    const memory = _.find(memories, {id});
    memory[attr] = !memory[attr];
    MemoryStore.save(memory).then(() => {
      this.setState({memories});
    });
  }

  editMemory = (id) => {
    this.props.navigation.navigate('EditMemory', {id});
  }

  deleteMemory = (id, memoryText) => {
    const memoryRemoval = (id) => {
      const memories = _.reject(this.state.memories, {id});
      MemoryStore.delete(id);
      this.setState({'memories': memories});
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

        <AddFAB
          onPress={() => this.props.navigation.navigate('EditMemory')}
        />
      </View>
    );
  }

}

function AddFAB(props) {
  return (
    <FAB
      style={styles.addFAB}
      color={Colors.text.onDark.strong}
      icon="add"
      onPress={props.onPress}
    />
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memoryInput: {
    backgroundColor: Colors.header.light,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    padding: 12,
  },
  textInput: {
    alignSelf: 'stretch',
    textAlignVertical: 'top',
    fontSize: 18,
    color: Colors.text.onDark.default,
    padding: 6,
    paddingLeft: 10,
    backgroundColor: Colors.overlay.black,
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
  },
  addFAB: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.primary.dark,
    color: Colors.text.onDark.strong,
  }
});
