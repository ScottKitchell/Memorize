import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type Props = {};
export default class EditMemoryToolbar extends React.Component<Props> {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.toolbar} keyboardShouldPersistTaps="always">
        <View>
          <TouchableOpacity style={styles.item} onPress={this.props.toggleFlag} >
            <Icon name="flag" size={24} style={this.props.flag? styles.selected : {}}/>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.item} onPress={this.props.toggleDone} >
            <Icon name="check-square" size={24} style={this.props.done? styles.selected : {}}/>
          </TouchableOpacity>
        </View>

        <View style={{flex:1}}>

        </View>

        <View>
          <TouchableOpacity style={styles.item} onPress={this.props.save} >
            <Text style={styles.itemText}>Done</Text>
            {/* <Icon name="save" size={24} color='#BA2BF7'/> */}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  toolbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    padding: 4,
  },
  item: {
    margin: 4,
    padding: 8,
  },
  itemText: {
    color: '#BA2BF7',
    fontSize: 18,
  },
  selected: {
    color: '#DA22FF',
  },
  title: {
    padding: 8,
    alignSelf: 'center',
    fontSize: 18,
  }
});
