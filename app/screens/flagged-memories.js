import React from 'react';
import { StyleSheet, View, FlatList, TextInput, StatusBar } from 'react-native';
import _ from 'lodash';
import MemoryListItem from 'app/components/memory-list-item';
import { MemoryStore, HashtagStore } from 'app/stores';
import { Colors } from 'app/styles';
import { FAB } from 'react-native-paper';

export default class Memories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memories: [],
      searchTerm: '',
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', () => {
      MemoryStore.filter('flag').then(memories => this.setState({ memories }));
    });
  }

  toggleFlag = (id) => this.toggle(id, 'flag');

  toggleDone = (id) => this.toggle(id, 'done');

  toggle = (id, attr) => {
    const memories = _.clone(this.state.memories);
    const memory = _.find(memories, { id });
    memory[attr] = !memory[attr];
    MemoryStore.save(memory).then(() => {
      this.setState({ memories });
    });
  }

  editMemory = (id) => {
    this.props.navigation.navigate('EditMemory', { id });
  }

  deleteMemory = (id, memoryText) => {
    const memoryRemoval = (id) => {
      const memories = _.reject(this.state.memories, { id });
      MemoryStore.delete(id);
      this.setState({ memories });
    };
    memoryRemoval(id);
    // Alert.alert(
    //   'Delete this memory?',
    //   memoryText,
    //   [
    //     {text: 'Cancel', style: 'cancel'},
    //     {text: 'Delete', onPress: () => memoryRemoval(id), style: 'destructive'},
    //   ],
    //   { cancelable: false }
    // );
  }

  search = (searchTerm) => {
    this.setState({ searchTerm }, () => {
      MemoryStore.search(searchTerm).then(memories => {
        this.setState({ memories });
      });
    });
  }

  renderMemory = ({ item }) => (
    <MemoryListItem
      id={item.id}
      memory={item}
      onDonePress={this.toggleDone}
      onFlagPress={this.toggleFlag}
      onEditPress={this.editMemory}
      onDeletePress={this.deleteMemory}
      onHashtagPress={(tag) => this.search(tag)}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#1a1a1a'} barStyle="light-content" />
        <View style={styles.memoryInput}>
          <TextInput
            style={styles.textInput}
            placeholder="Search Memories"
            placeholderTextColor="#CCC"
            multiline={true}
            underlineColorAndroid="transparent"
            value={this.state.searchTerm}
            onChangeText={this.search}
          />
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
    backgroundColor: Colors.white.light,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    padding: 12,
  },
  textInput: {
    alignSelf: 'stretch',
    textAlignVertical: 'top',
    fontSize: 18,
    color: Colors.text.default,
    padding: 6,
    paddingLeft: 10,
    backgroundColor: Colors.overlay.black,
    borderRadius: 3,
  },
  addFAB: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.fab.background,
    color: Colors.fab.icon,
  },
});
