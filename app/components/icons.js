import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export { Icon };

export class ToggleIcon extends React.Component {

  static propTypes = {
    style: PropTypes.object,
    toggled: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    toggledName: PropTypes.string.isRequired,
    color: PropTypes.string,
    toggledColor: PropTypes.string,
    size: PropTypes.number,
    onPress: PropTypes.func,
  }

  constructor(props){
    super(props);
  }

  render() {
    const name = this.props.toggled? this.props.toggledName : this.props.name;
    const color = (this.props.toggled && this.props.toggledColor)? this.props.toggledColor : this.props.color;
    const width = this.props.size? this.props.size+10 : 20;
    return (
      <View style={[{width: width}, this.props.style]}>
      <TouchableWithoutFeedback onPress={this.props.onPress} >
        <Icon name={name} size={this.props.size} color={color}/>
      </TouchableWithoutFeedback>
    </View>
    );
  }

}
