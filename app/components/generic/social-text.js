import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

const URL_REGEX = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/


export class SocialTextInput extends React.Component {
  static propTypes = {
    ...TextInput.propTypes,
    onHashtagEntering: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      cursor: 0,
    }
    this.textInputRef = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only update when cursor has changed as this is after text has been updated
      // Don't update for cursor changes
    return (nextState.cursor === this.state.cursor);
  }

  clear = () => {
    if (this.props.onChangeText) this.props.onChangeText('');
    else this.textInputRef.current.clear();
  }

  isFocused = () => this.textInputRef.current.isFocused();

  insertAtCursor = (chars, cursor=this.state.cursor) => {
    if (!this.props.onChangeText) return;
    const text = this.props.value.slice(0, cursor).concat(chars, this.props.value.slice(cursor));
    this.props.onChangeText(text);
  }

  _handleSelectionChange = (event) => {
    this.setState({cursor: event.nativeEvent.selection.start});
    if (this.props.onSelectionChange)
      this.props.onSelectionChange(event);
  }

  _checkForKeyWords = async (text) => {
    if(!this.props.onHashtagEntering) {
      const wordStartIndex = this._getWordStartIndex(text, this.state.cursor);
      if(text[wordStartIndex] === '#')
        this.props.onHashtagEntering(text.slice(wordStartIndex+1, this.state.cursor+1));
    }
  }

  _getWordStartIndex = (text, cursor) => {
    for(let i=cursor; i>=0; i--) {
      if(text[i] === ' ') return i+1;
    }
  }

  render() {
    const { value, onHashtagEntering, hashtagStyle, urlStyle, ...props } = this.props;
    this._checkForKeyWords(value);
    return (
      <TextInput
        ref={this.textInputRef}
        {...props}
        onSelectionChange={this._handleSelectionChange}
      >
        <SocialText hashtagStyle={hashtagStyle} urlStyle={urlStyle}>
          {value}
        </SocialText>
      </TextInput>
    );
  }
}


export function SocialText(props) {
  const { onHashtagPress, onURLPress, hashtagStyle, urlStyle, ...containerProps } = props;
  const richText = props.children.split(" ").reduce((textArray, word, i) => {
    const richWord = (word[0] === "#")
      ? <Text onPress={()=>props.onHashtagPress(word)} key={i} style={hashtagStyle}>{word}</Text>
      : (word.match(URL_REGEX))
        ? <Text onPress={()=>props.onUrlPress(word)} key={i} style={urlStyle}>{word}</Text>
        : word;
    return textArray.concat((i)? [' ', richWord] : [richWord]);
  }, []);
  return <Text {...containerProps}>{richText}</Text>;
}
SocialText.propTypes = {
  ...Text.propTypes,
  hashtagStyle: Text.propTypes.style,
  urlStyle: Text.propTypes.style,
  onHashtagPress: PropTypes.func,
  onUrlPress: PropTypes.func,
}
SocialText.defaultTypes = {
  onHashtagPress: ()=>true,
  onUrlPress: ()=>true,
}
