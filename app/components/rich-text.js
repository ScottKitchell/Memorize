import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace';

export default class RichText extends React.Component {

  static propTypes = {
    children: PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  renderHashtag = (text,i) => <Text key={i} style={styles.hastag}>{text}</Text>;

  render() {
    const text = this.props.children+'';
    const hashtag = /#([a-zA-Z\d]+)/g;
    const richText = reactStringReplace(text, hashtag, this.renderHashtag);
    
    return (
      <Text {...this.props}>
        {richText}
      </Text>
    );
  }
 
}

const styles = StyleSheet.create({
  hashtag: {
    color: '#9733EE',
  }
});
