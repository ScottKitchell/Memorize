import React from 'react';
import PropTypes from 'prop-types';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export const Icon = MaterialCommunityIcon;
export const FontAwesomeIcon = FontAwesome5Icon;

export function ToggleIcon(props) {
  const name = (props.toggled && props.toggledName)? props.toggledName : props.name;
  const color = (props.toggled && props.toggledColor)? props.toggledColor : props.color;
  const style = (props.toggled && props.toggledStyle)? props.toggledStyle : props.style;
  return (
    <Icon name={name} size={props.size} color={color} style={style} from={props.from}/>
  );
}
ToggleIcon.propTypes = {
  toggled: PropTypes.bool.isRequired,
  style: PropTypes.object,
  toggledStyle: PropTypes.object,
  name: PropTypes.string.isRequired,
  toggledName: PropTypes.string,
  color: PropTypes.string,
  toggledColor: PropTypes.string,
  size: PropTypes.number,
}
