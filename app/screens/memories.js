import React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-navigation';
import _ from 'lodash';
import Screen from 'app/components/screen';
import MemoryListItem from 'app/components/memory';
import FloatingAddButton from 'app/components/add-new-button';
import { MemoryStore } from 'app/stores';
import { Colors } from 'app/styles';
import { Appbar } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';


export default class MemoriesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memories: [],
      flagsOnly: false,
    };
    this._memoriesList = React.createRef();
  }

  componentDidMount() {
    this._screenFocusListener = this.props.navigation.addListener('didFocus', this.updateMemories);
    this.props.navigation.navigate('EditMemory');
  }

  componentWillUnmount() {
    this._screenFocusListener.remove();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.flagsOnly !== prevState.flagsOnly)
      this.updateMemories();
  }

  updateMemories = () => {
    (this.state.flagsOnly? MemoryStore.filter('flag') : MemoryStore.all())
    .then(memories => this.setState({ memories }));
  }

  toggleFlag = (id) => this.toggle(id, 'flag');

  toggleDone = (id) => this.toggle(id, 'done');

  toggle = (id, attr) => {
    const memories = _.clone(this.state.memories);
    const memory = _.find(memories, {id});
    memory[attr] = !memory[attr];
    this.setState({ memories }, () => MemoryStore.save(memory));
  }

  editMemory = (id) => {
    this.props.navigation.navigate('EditMemory', {id});
  }

  deleteMemory = (id) => {
    const memories = _.reject(this.state.memories, {id});
    this.setState({ memories }, () => MemoryStore.delete(id));
  }

  search = (search) => {
    this.props.navigation.navigate('SearchResults', {search});
  }

  handleFlagsFilterPress = () => {
    this.setState({flagsOnly: !this.state.flagsOnly});
  }

  scrollToTop = () => this._memoriesList.current.scrollToIndex(0);

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
      <Screen>
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
          ref={this._memoriesList}
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


const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.header.light,
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
});
