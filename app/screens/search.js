import React from 'react';
import { StyleSheet, View, FlatList, TextInput, StatusBar } from 'react-native';
import _ from 'lodash';
import MemoryListItem from 'app/components/memory';
import { MemoryStore, HashtagStore } from 'app/stores';
import { Colors } from 'app/styles';
import { FAB, Searchbar, Appbar } from 'react-native-paper';
import Screen from 'app/components/screen';

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      tags: [],
      searchTerm: '',
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', () => {
      this.search(this.getSearchTermFromRoute());
    });
  }

  getSearchTermFromRoute = () => this.props.navigation.getParam('search', '');

  UpdateSearch = (searchTerm) => {
    this.setState({searchTerm}, () => {
      HashtagStore.search(searchTerm).then(tags => {
        this.setState({tags});
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
      <Screen>
        <View style={styles.memoryInput}>
          <SearchInput
            value={this.state.searchTerm}
            autoFocus={(!this.state.searchTerm)}
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

        <AddFAB
          onPress={() => this.props.navigation.navigate('EditMemory')}
        />
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

const AddFAB = (props) => (
  <FAB
    style={styles.addFAB}
    color={Colors.text.onDark.strong}
    icon="add"
    onPress={props.onPress}
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
    // backgroundColor: Colors.overlay.black,
    backgroundColor: 'red',
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
