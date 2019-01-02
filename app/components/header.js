import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Colors } from 'app/styles';

type Props = {};
export default class Header extends React.Component<Props> {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.header} keyboardShouldPersistTaps="handled">
        <View>
          <TouchableOpacity style={styles.item} onPress={this.props.goBack} >
            <Icon name="arrow-left" style={styles.icon}/>
          </TouchableOpacity>
        </View>

        <View style={styles.title}>
          <Text style={styles.titleText}>{this.props.title}</Text>
        </View>

        <View>
          {/* <TouchableOpacity style={styles.item} >
            <Icon name="more-vertical" style={styles.icon}/>
          </TouchableOpacity> */}
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
    backgroundColor: Colors.header.light,
    borderBottomWidth: 0,
    borderBottomColor: '#EEE',
    padding: 4,
  },
  item: {
    margin: 4,
    padding: 8,
  },
  itemText: {
    color: Colors.text.default,
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
    color: Colors.text.default,
  },
  icon: {
    fontSize: 24,
    color: Colors.text.default,
  }
});
