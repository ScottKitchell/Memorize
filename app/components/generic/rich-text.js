import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

const KEYWORD_REGEX = /#(\w+)/g
const URL_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g


export class RichText extends React.PureComponent {

  enrichText = () => {
    if (this.props.children == null) return '';
    const formats = [
      {regex: KEYWORD_REGEX, style: [styles.keyword, this.props.keywordStyle]},
      // {regex: URL_REGEX, style: [styles.url, this.props.urlStyle]},
    ];
    return _.reduce(formats, this.wrapMatchesInStyledText, this.props.children);
  };

  wrapMatchesInStyledText = (text, matching) => {
    let result = text.split(matching.regex);
    for (let i=1; i<result.length; i+=2) {
      result[i] = <Text key={'richText'+i} style={matching.style}>#{result[i]}</Text>
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


// class ParseTextInput extends React.Component {
//
//   var regexp = /\bcat[^\b]*?\b/gi;
//
//    var timer;
//    $("#editor").keyup(function(event){
//      timer = Math.floor(Date.now() / 1000);
//    });
//
//    setInterval(function(){
//      if(Math.floor(Date.now() / 1000) - timer >= 2)
//        colorize();
//    },5000);
//
//    function colorize(){
//
//      var foo = $("#editor").text();
//      var match, matches = [];
//
//      while ((match = regexp.exec(foo)) != null) {
//        matches.push(match.index);
//      }
//
//      var i;
//      var start = 0;
//      var content = "";
//      var element = "<span style='color:red;'>cat</span>";
//
//      for(i = 0; i < matches.length; i++){
//        content += "<span>" + foo.substring(start,matches[i]) + "</span>" + element;
//        start = matches[i] + 3;
//      }
//      content += "<span>"+foo.substring(matches[i-1]+3,foo.length)+"</span>";
//
//      $("#editor").html(content).focus();
//      placeCaretAtEnd( document.getElementById("editor") );
//    }
//
//    function placeCaretAtEnd(el) {
//      el.focus();
//      if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
//          var range = document.createRange();
//          range.selectNodeContents(el);
//          range.collapse(false);
//          var sel = window.getSelection();
//          sel.removeAllRanges();
//          sel.addRange(range);
//      } else if (typeof document.body.createTextRange != "undefined") {
//          var textRange = document.body.createTextRange();
//          textRange.moveToElementText(el);
//          textRange.collapse(false);
//          textRange.select();
//      }
//    }
//
//    render(){
//
//    }
//
// }
