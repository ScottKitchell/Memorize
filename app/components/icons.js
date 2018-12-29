import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, View } from 'react-native';
import NativeIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Icon = NativeIcon;

export function ToggleIcon(props) {
  const name = (props.toggled && props.toggledName)? props.toggledName : props.name;
  const color = (props.toggled && props.toggledColor)? props.toggledColor : props.color;
  const style = (props.toggled && props.toggledStyle)? props.toggledStyle : props.style;
  return (
    <NativeIcon name={name} size={props.size} color={color} style={style}/>
  );
}
ToggleIcon.propTypes = {
  toggled: PropTypes.bool.isRequired,
  style: PropTypes.object,
  toggledStyle: PropTypes.object,
  name: PropTypes.string.isRequired,
  toggledName: PropTypes.string.isRequired,
  color: PropTypes.oneOfType([PropTypes.string,PropTypes.object]),
  toggledColor: PropTypes.oneOfType([PropTypes.string,PropTypes.object]),
  size: PropTypes.number,
}
