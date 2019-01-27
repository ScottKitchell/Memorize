import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { Icon } from './generic/icons'


export function EditMemoryToolbar2(props) {
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={28}
      contentContainerStyle={styles.toolbar}
      keyboardShouldPersistTaps="always"
    >
      <View>
        <TouchableOpacity style={styles.item} onPress={props.toggleFlag} >
          <Icon name="flag" size={24} style={props.flag ? styles.selected : {}}/>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.item} onPress={props.toggleDone} >
          <Icon name="check" size={24} style={props.done ? styles.selected : {}}/>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.item} onPress={props.save} >
          <Text style={styles.itemText}>Done</Text>
          {/* <Icon name="save" size={24} color='#BA2BF7'/> */}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
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
})
