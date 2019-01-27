import React from 'react'
import { StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Colors } from 'app/styles'
import { FAB } from 'react-native-paper'


function FloatingAddButton({ navigation, ...props }) {
  return (
    <FAB
      style={styles.FloatingAddButton}
      color={Colors.text.onDark.strong}
      icon="add"
      onPress={() => navigation.navigate('EditMemory')}
    />
  )
}
FloatingAddButton.propTypes = FAB.propTypes

export default withNavigation(FloatingAddButton)


const styles = StyleSheet.create({
  FloatingAddButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.fab.background,
    color: Colors.fab.icon,
  },
})