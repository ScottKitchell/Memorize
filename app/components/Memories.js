import React from 'react';
import {Platform, Alert, StyleSheet, AsyncStorage, Text, View, ScrollView, TextInput, TouchableOpacity, Button, StatusBar} from 'react-native';
import MemoryCard from './MemoryCard';

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
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
      AsyncStorage.getItem('memoryArray', (err, data) => {
        if(data) this.setState({'memoryArray': JSON.parse(data)});
      });
    });
  }

  render() {
    let memories = this.state.memoryArray.map((val, key) => {
      return <MemoryCard key={key} keyval={key} val={val} deleteMethod={() => this.deleteMemory(key) } />
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

        <TouchableOpacity style={styles.newButton} onPress={() => this.props.navigation.navigate('NewMemory')} >
          <Text style={styles.newButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }

  deleteMemory(key) {
    this.state.memoryArray.splice(key, 1);
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
    borderBottomWidth: 3,
    borderBottomColor: '#EEE',
  },
  textInput: {
    alignSelf: 'stretch',
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#555',
    padding: 20,
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
