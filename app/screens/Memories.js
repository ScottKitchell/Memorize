import React from 'react';
import {Platform, Alert, StyleSheet, AsyncStorage, View, ScrollView, FlatList, Text, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MemoryListItem from '../components/MemoryListItem';

type Props = {};
export default class Memories extends React.Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      memoryArray: [],
      memoryText: '',
    }
  }

  componentDidMount() {
    //AsyncStorage.removeItem('memoryArray'); // For development only to remove all stored memories
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
      AsyncStorage.getItem('memoryArray', (err, data) => {
        if(data) this.setState({'memoryArray': JSON.parse(data)});
      });
    });
    this.props.navigation.navigate('EditMemory');
  }

  render() {
    let memories = this.state.memoryArray.map((memory, key) => {
      return <MemoryListItem key={key} keyval={key} memory={memory} toggleDone={() => this.toggleDone(key)} toggleFlag={() => this.toggleFlag(key)} edit={() => this.editMemory(key)} delete={() => this.deleteMemory(key,memory.text)}/>
    });

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#FFF" barStyle="dark-content"/>
        <View style={styles.memoryInput}>
          <TextInput style={styles.textInput} placeholder="Search Memories" placeholderTextColor="#CCC" multiline={true} underlineColorAndroid="transparent"
            onChangeText={(memoryText) => this.setState({memoryText})} value={this.state.memoryText}>
              {/*<ParsedText><Text style{{color: '#336699'}}>{this.setState({memoryText})}</Text></ParsedText>*/}
          </TextInput>
        </View>
        <View>

        </View>

        <ScrollView style={styles.body}>
          {memories}
        </ScrollView>

        {/* <FlatList style={styles.body} data={this.state.memoryArray}
          renderItem={({memory, index}) => {
            <MemoryListItem memory={memory} toggleDone={() => this.toggleDone(index)} toggleFlag={() => this.toggleFlag(index)} delete={() => this.deleteMemory(index)}/>
          }}
        /> */}

        <TouchableOpacity style={styles.newButton} onPress={() => this.props.navigation.navigate('EditMemory')} >
          <Icon name="plus" size={18} color='#FFF'/>
        </TouchableOpacity>
      </View>
    );
  }

  toggleFlag(key) {
    const toggleOn = !this.state.memoryArray[key].flag;
    let memoryArray = Object.assign([], this.state.memoryArray);
    let memory = memoryArray[key];
    memory.flag = toggleOn;
    //memory.text = toggleOn? memory.text+' !FLAG' : memory.text.replace(/\s?\!FLAG/g,'');
    this.setState({'memoryArray': memoryArray});
  }

  toggleDone(key) {
    const toggleOn = !this.state.memoryArray[key].done;
    let memoryArray = Object.assign([], this.state.memoryArray);
    let memory = memoryArray[key];
    memory.done = toggleOn;
    //memory.text = toggleOn? memory.text+' !DONE' : memory.text.replace(/\s?\!DONE/g,'');
    this.setState({'memoryArray': memoryArray});
  }

  editMemory(key) {
    this.props.navigation.navigate('EditMemory',this.state.memoryArray[key]);
  }

  deleteMemory(key, memoryText){
    Alert.alert(
      'Delete this memory?',
      memoryText,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: () => this.confirmDeleteMemory(key), style: 'destructive'},
      ],
      { cancelable: false }
    );
  }

  confirmDeleteMemory(key) {
    this.state.memoryArray.splice(key, 1); // TODO Change so not mutating state
    this.setState({'memoryArray': this.state.memoryArray});
    AsyncStorage.setItem('memoryArray', JSON.stringify(this.state.memoryArray));
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memoryInput: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  textInput: {
    alignSelf: 'stretch',
    textAlignVertical: 'top',
    fontSize: 18,
    color: '#555',
    padding: 16,
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
  newButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 56,
    width: 56,
    borderRadius: 30,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BA2BF7',
  },
  newButtonText: {
    fontSize: 22,
    color: '#FFF'
  }
});
