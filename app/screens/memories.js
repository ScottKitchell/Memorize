import React from 'react';
import { StyleSheet, View, FlatList, TextInput, StatusBar } from 'react-native';
import _ from 'lodash';
import MemoryListItem from 'app/components/memory';
import { MemoryStore, HashtagStore } from 'app/stores';
import { Colors } from 'app/styles';
import { FAB, Appbar } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default class MemoriesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memories: [],
      searchTerm: '',
      flagsOnly: false,
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', () => {
      this.updateMemories();
    });
    this.props.navigation.navigate('EditMemory');
  }

  updateMemories = (flagsOnly = this.state.flagsOnly) => {
    if (flagsOnly)
      MemoryStore.filter('flag').then(memories => this.setState({ memories }));
    else 
      MemoryStore.all().then(memories => this.setState({ memories }));
  }

  toggleFlag = (id) => this.toggle(id, 'flag');

  toggleDone = (id) => this.toggle(id, 'done');

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
      this.setState({memories});
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

  search = (search) => {
    this.props.navigation.navigate('Search', {search});
  }

  handleFlagsFilterPress = () => { 
    const flagsOnly = !this.state.flagsOnly;
    this.updateMemories(flagsOnly);
    this.setState({flagsOnly});
  }

  renderMemory = ({item}) => (
    <MemoryListItem
      id={item.id}
      memory={item}
      onDonePress={this.toggleDone}
      onFlagPress={this.toggleFlag}
      onEditPress={this.editMemory}
      onDeletePress={this.deleteMemory}
      onHashtagPress={(tag)=>this.search(tag)}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.statusBar} barStyle="light-content"/>
        <Appbar.Header style={styles.header}>
          <Appbar.Content
            title="Memories"
          />
          <Appbar.Action 
            icon={({size, color})=>(
              <FeatherIcon name="flag" size={size} color={color}/>
            )}
            onPress={this.handleFlagsFilterPress} 
            color={this.state.flagsOnly? Colors.primary.light : Colors.lightGrey.dark}
          />
        </Appbar.Header>

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
  header: {
    backgroundColor: Colors.header.light,
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
