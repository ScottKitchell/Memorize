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


export default function MemoriesScreen(props) {
  const toggleFlag = (id) => this.toggle(id, 'flag');

  const toggleDone = (id) => this.toggle(id, 'done');

  const toggle = (id, attr) => {
    const memories = _.clone(this.state.memories);
    const memory = _.find(memories, {id});
    memory[attr] = !memory[attr];
    this.setState({ memories }, () => MemoryStore.save(memory));
  };

  const editMemory = (id) => {
    props.navigation.navigate('EditMemory', {id});
  };

  const deleteMemory = (id) => {
    const memories = _.reject(this.state.memories, {id});
    this.setState({ memories }, () => MemoryStore.delete(id));
  };

  const renderMemory = ({item}) => (
    <MemoryListItem
      id={item.id}
      memory={item}
      onDonePress={toggleDone}
      onFlagPress={toggleFlag}
      onEditPress={editMemory}
      onDeletePress={deleteMemory}
      onHashtagPress={(tag)=>this.search(tag)}
    />
  );

  return (
    <FlatList
      style={styles.flatList}
      data={props.memories}
      keyExtractor={item => String(item.id)}
      renderItem={renderMemory}
    />
  );
}


const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
});
