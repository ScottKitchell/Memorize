import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { FlatList } from 'react-navigation';
import _ from 'lodash';
import { MemoryStore } from 'app/stores';
import Screen from 'app/components/screen';
import FloatingAddButton from 'app/components/add-new-button';
import MemoryListItem from 'app/components/memory';
import { Colors } from 'app/styles';


export default class SearchResultsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memories: [],
      // Double space in searchTerm is so componentDidUpdate check will updateSearchResults 
      // on the first render.
      searchTerm: ' ', 
    };
  }

  componentDidMount() {
    this._screenFocusListener = this.props.navigation.addListener('didFocus', () => {
      this.search(this.getSearchTermFromRoute());
    });
  }

  componentWillUnmount() {
    this._screenFocusListener.remove();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchTerm !== prevState.searchTerm) {
      this.updateSearchResults();
    }
  }

  getSearchTermFromRoute = () => this.props.navigation.getParam('search', '');

  toggleFlag = (id) => this.toggle(id, 'flag');

  toggleDone = (id) => this.toggle(id, 'done');

  toggle = (id, attr) => {
    const memories = _.clone(this.state.memories);
    const memory = _.find(memories, { id });
    memory[attr] = !memory[attr];
    this.setState({ memories }, () => MemoryStore.save(memory));
  }

  editMemory = (id) => {
    this.props.navigation.navigate('EditMemory', { id });
  }

  deleteMemory = (id) => {
    const memories = _.reject(this.state.memories, { id });
    this.setState({ memories }, () => MemoryStore.delete(id));
  }

  search = (searchTerm) => {
    this.setState({searchTerm});
  }

  updateSearchResults = () => {
    MemoryStore.search(this.state.searchTerm)
    .then(memories => this.setState({memories}));
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
      <Screen>
        <View style={styles.memoryInput}>
          <SearchInput
            value={this.state.searchTerm}
            // autoFocus={(!this.state.searchTerm)}
            onChangeText={this.search}
            style={styles.searchInput}
            placeholderTextColor="#CCC"
          />
        </View>

        <FlatList
          style={styles.body}
          data={this.state.memories}
          extraData={this.state}
          keyExtractor={item => String(item.id)}
          renderItem={this.renderMemory}
        />

        <FloatingAddButton />
      </Screen>
    );
  }
}

const SearchInput = (props) => (
  <TextInput 
    returnKeyType="search"
    selectTextOnFocus={true}
    spellCheck={false}
    maxLength={30}
    enablesReturnKeyAutomatically={true}
    placeholder="Search"
    underlineColorAndroid="transparent"
    {...props} 
  />
);


const styles = StyleSheet.create({
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
});
