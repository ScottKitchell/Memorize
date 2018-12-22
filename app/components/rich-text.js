import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

const KEYWORD_REGEX = /#(\w+)/g
const URL_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g


export class RichText extends React.Component {

  shouldComponentUpdate(nextProps) {
    return (nextProps.children != this.props.children);
  }

  enrichText = () => {
    if (this.props.children == null) return '';
    const formats = [
      {regex: KEYWORD_REGEX, style: [styles.keyword, this.props.keywordStyle]},
      {regex: URL_REGEX, style: [styles.url, this.props.urlStyle]},
    ];
    return _.reduce(formats, this.wrapMatchesInStyledText, this.props.children);
  };

  wrapMatchesInStyledText = (text, format) => {
    let result = text.split(format.regex);
    for (let i=1; i<result.length; i+=2) {
      result[i] = <Text key={'richText'+i} style={format.style}>#{result[i]}</Text>
    }
    return result;
  }

  render() {
    const richText = this.enrichText();
    console.log('Enriched text.');
    return <Text {...this.props}>{richText}</Text>;
  }
}

export class RichTextInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: props.defaultValue,
    }
  }

  handleOnChange = (text) => {
    console.log('Update text to:', text);
    this.setState({text});
    if(this.props.onChangeValue)
      this.props.onChangeText(text);
  }

  render() {
    const {keywordStyle, urlStyle, ...inputProps} = this.props;
    return (
      <TextInput {...inputProps} onChangeText={this.handleOnChange}>
        <RichText keywordStyle={keywordStyle} urlStyle={urlStyle}>
          {this.state.text}
        </RichText>
      </TextInput>
    );
  }
}


styles = StyleSheet.create({
  keyword: {
    color: '#be2edd',
  },
  url: {
    color: '#686de0',
    textDecorationLine: 'underline',
  }
});
