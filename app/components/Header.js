import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type Props = {};
export default class Header extends React.Component<Props> {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.header} keyboardShouldPersistTaps="handled">
        <View>
          <TouchableOpacity style={styles.item} onPress={this.props.closeScreen} >
            <Icon name="chevron-left" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.title}>
          <Text style={styles.titleText}>New Memory</Text>
        </View>

        <View>
          <TouchableOpacity style={styles.item} >
            <Icon name="more-vertical" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
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
  title: {
    flex: 1,
    padding: 8,
  },
  titleText: {
    padding: 8,
    fontSize: 18,
    fontWeight: 'bold',
  }
});
