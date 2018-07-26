import React from 'react';
import {Platform, StyleSheet, AsyncStorage, Text, View, ScrollView, TextInput, TouchableOpacity, Button} from 'react-native';
import MemoryCard from '../components/MemoryCard';

type Props = {};
export default class FlaggedMemories extends React.Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      memoryArray: [],
      memoryText: '',
    }
  }

  componentDidMount() {
    /*AsyncStorage.getItem('memoryArray', (err, data) => {
      if(data) this.setState({'memoryArray': JSON.parse(data)});
    });*/
  }

  render() {
    /*let memories = this.state.memoryArray.map((val, key) => {
      return <MemoryCard key={key} keyval={key} val={val} deleteMethod={() => this.deleteMemory(key) } />
    });*/

    return (
      <View style={styles.container}>
        <Text>Screen 2!</Text>
        {/* <View style={styles.header}>
          <TouchableOpacity style={styles.saveButton} onPress={ this.addMemory.bind(this) } >
            <Text style={styles.saveButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.memoryInput}>
          <TextInput style={styles.textInput} placeholder="Remember" placeholderTextColor="#CCC" multiline={true} underlineColorAndroid="transparent"
            onChangeText={(memoryText) => this.setState({memoryText})} value={this.state.memoryText}></TextInput>
        </View>

        <ScrollView style={styles.body}>
          {memories}
        </ScrollView>

        <TouchableOpacity style={styles.newButton} onPress={() => this.props.navigation.navigate('FirstScreen')} >
          <Text style={styles.newButtonText}>+</Text>
        </TouchableOpacity> */}
      </View>
    );
  }

  addMemory() {
    if(this.state.memoryText) {
      let d = new Date();
      this.state.memoryArray.unshift({
        memory: this.state.memoryText
      });
      this.setState({'memoryArray': this.state.memoryArray, memoryText: ''});
      AsyncStorage.setItem('memoryArray', JSON.stringify(this.state.memoryArray));
    }
  }

  deleteMemory(key) {
    this.state.memoryArray.splice(key, 1);
    this.setState({'memoryArray': this.state.memoryArray});
    AsyncStorage.setItem('memoryArray', JSON.stringify(this.state.memoryArray));
  }

  /*filterFlagsOnly() {
    let flagged = (memory) => { return memory.flag };
    this.state.memoryArray.
  }*/

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 4,
  },
  memoryInput: {
    backgroundColor: '#FFF',
    borderBottomWidth: 3,
    borderBottomColor: '#EEE',
  },
  textInput: {
    alignSelf: 'stretch',
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#555',
    padding: 20,
    minHeight: 120,
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
  saveButton: {
    height: 34,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5b10b0',
    borderRadius: 17,
  },
  saveButtonText: {
    color: '#FFF',
  },
  newButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 64,
    width: 64,
    borderRadius: 50,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5b10b0',
  },
  newButtonText: {
    fontSize: 22,
    color: '#FFF'
  }
});
