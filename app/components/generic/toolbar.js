import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { Icon, ToggleIcon } from './icons'
import { Colors } from 'app/styles'
import PropTypes from 'prop-types'

export default class Toolbar extends React.Component {
  static propTypes = {
    keyboardAvoiding: PropTypes.bool,
    // style,
  }

  static defaultProps = {
    keyboardAvoiding: false,
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={28}
        contentContainerStyle={[styles.toolbar, this.props.style]}
        enabled={this.props.keyboardAvoiding}
      >
        {this.props.children}
      </KeyboardAvoidingView>
    )
  }

  // Sub components
  static Action = Action
  static Button = Button
}

export function Action(props) {
  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={() => { props.onPress(); console.log('press') }}
      disabled={props.disabled}
    >
      {props.icon && (
        <ToggleIcon
          name={props.icon}
          toggledName={props.selectedIcon}
          color={props.color}
          toggledColor={props.selectedColor}
          size={props.size}
          toggled={props.selected}
        />
      )}
      {props.children}
    </TouchableOpacity>
  )
}
Action.propTypes = {
  selected: PropTypes.bool,
  onPress: PropTypes.func,
  icon: PropTypes.string,
  selectedIcon: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  selectedColor: PropTypes.string,
  disabled: PropTypes.bool,
}
Action.defaultProps = {
  size: 24,
  selected: false,
  disabled: false,
}

export function Button(props) {
  return (
    <Action {...props} style={[styles.button, props.style]} keyboardShouldPersistTaps="always">
      {props.children && <Text>{props.children}</Text>}
    </Action>
  )
}
Button.propTypes = {
  selected: PropTypes.bool,
  onPress: PropTypes.func,
  icon: PropTypes.string,
  selectedIcon: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  selectedColor: PropTypes.string,
  disabled: PropTypes.bool,
}
Button.defaultProps = {
  size: 24,
  selected: false,
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
    justifyContent: 'flex-start',
    backgroundColor: Colors.white.light,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingLeft: 8,
    paddingRight: 8,
  },
  action: {
    margin: 4,
    padding: 8,
  },
  button: {
    margin: 4,
    padding: 8,
  },
})
