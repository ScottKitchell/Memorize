import React from 'react';
import { StyleSheet, View, FlatList, TextInput, StatusBar } from 'react-native';
import _ from 'lodash';
import MemoryListItem from 'app/components/memory';
import { MemoryStore, HashtagStore } from 'app/stores';
import { Colors } from 'app/styles';
import { FAB, Searchbar, Appbar } from 'react-native-paper';

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memories: [],
      searchTerm: '',
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', () => {
      this.search(this.getSearchTermFromRoute());
    });
  }

  getSearchTermFromRoute = () => this.props.navigation.getParam('search', '');

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
    this.setState({searchTerm}, () => {
      MemoryStore.search(searchTerm).then(memories => {
        this.setState({memories});
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
        <StatusBar backgroundColor={Colors.statusBar} barStyle="light-content"/>
        <View style={styles.memoryInput}>
          <TextInput
            value={this.state.searchTerm}
            placeholder="Search"
            autoFocus={(!this.state.searchTerm)}
            onChangeText={this.search}
            style={styles.searchInput}
            placeholderTextColor="#CCC"
            underlineColorAndroid="transparent"
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
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 0,
    paddingLeft: 16,
    paddingRight: 16,
  },
  searchInput: {
    flex: 1,
    height: 36,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 6,
    fontSize: 18,
    color: Colors.text.default,
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
