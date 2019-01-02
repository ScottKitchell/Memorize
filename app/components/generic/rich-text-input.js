import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
// import reactStringReplace from 'react-string-replace';
import _ from 'lodash';


// export class RichTextInput2 extends React.PureComponent {
//
//   static propTypes = {
//     matchStyles: PropTypes.array.isRequired, //[{pattern:/regex/,style:{}}]
//   }
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       text: '',
//       richText: [],
//       selection: {start:0, end:0}
//       updatedSelection: {start:0, end:0}
//     }
//     this.richTextInput = React.createRef();
//   }
//
//   shouldComponentUpdate(nextProps, nextState) {
//     if ((this.state.selection.start != nextState.selection.start) ||
//       (this.state.selection.end != nextState.selection.end)) return false;
//     return true
//   }
//
//   setSelection = (event) => {
//     const nextSelection = event.nativeEvent.selection
//     let updatedSelection = {start:0, end:0}
//     updatedSelection.start = this.state.selection.end
//
//     if (this.state.selection.start == this.state.selection.end) {
//       updatedSelection.start = this.state.selection.end
//     }
//
//     this.setState({
//       selection: nextSelection
//       updatedSelection: updatedSelection
//     });
//   }
//
//   getUpdatedSelection = (newSelction) =>{
//     // 3,3 to 4,4
//     const start = (newSelection.end > this.state.selection.start) newSelection.end - this.state.selection.start : newSelection.end - this.state.selection.start
//   }
//
//   enrichText = (text) {
//     const newSubStr = this.text.substring(this.state.selection)
//   }
//
//   enrichFullText = (text) => {
//     const richText = _.reduce(this.props.matchStyles, this.wrapMatchesInStyledText, text)
//     this.setState({
//       text: text,
//       richText
//     });
//     // const richText = _.reduce(this.props.matchStyles, this.wrapMatchesInStyledText, text);
//     // this.richTextInput.current.setNativeProps({value: richText})
//   };
//
//   wrapMatchesInStyledText = (text, matchStyle) => {
//     let result = text.split(matchStyle.pattern);
//     for (let i=1; i<result.length; i+=2) {
//       result[i] = <Text key={'richText'+i} style={matchStyle.style}>#{result[i]}</Text>
//     }
//     return result;
//   }
//
//   render() {
//     console.log('RichTextInput2 rerender')
//     // console.log('selection',this.state.selection.start, this.state.selection.end)
//     // console.log('text', this.state.text)
//     return (
//       <TextInput
//         {...this.props}
//         ref={this.richTextInput}
//         onChangeText={this.enrichText}
//         onSelectionChange={this.setSelectionPos}
//       />
//     );
//   }
//
// }


export class RichText extends React.PureComponent {
  static propTypes = {
    matchStyles: PropTypes.array.isRequired, //[{pattern:/regex/,style:{}}]
  }

  constructor(props) {
    super(props);
  }

  enrichText = () => {
    if (this.props.children == null) return ''
    return _.reduce(this.props.matchStyles, this.wrapMatchesInStyledText, this.props.children)
    // const richText = _.reduce(this.props.matchStyles, this.wrapMatchesInStyledText, text);
    // this.richTextInput.current.setNativeProps({value: richText})
  };

  wrapMatchesInStyledText = (text, matchStyle) => {
    let result = text.split(matchStyle.pattern);
    for (let i=1; i<result.length; i+=2) {
      result[i] = <Text key={'richText'+i} style={matchStyle.style}>#{result[i]}</Text>
    }
    return result;
  }

  render() {
    // console.log('RichText rerender')
    const richText = this.enrichText()
    return (
      // <TextInput {...this.props} ref={this.richTextInput} onChangeText={this.enrichText}/>
      // <TextInput {...this.props} onChangeText={this.enrichText}>
      //   <Text ref={this.richTextInput}></Text>
      // </TextInput>
      <Text {...this.props}>
        {richText}
      </Text>
    );
  }


}

export class RichTextInput extends React.Component {

  static propTypes = {
    matchStyles: PropTypes.array.isRequired, //[{pattern:/regex/,style:{}}]
  }

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      richText: '',
      // selection: {start:0, end:0}
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (nextState.text.length != this.state.text.length)
  // }

  // setSelectionPos = (event) => {
  //   this.setState({selection: event.nativeEvent.selection})
  // }

  enrichTextDebounced = (text) => _.throttle(this.enrichText, 500);

  enrichText = (text) => {
    this.setState({
      text: text,
      richText: _.reduce(this.props.matchStyles, this.wrapMatchesInStyledText, text),
    });
  };

  wrapMatchesInStyledText = (text, matchStyle) => {
    let result = text.split(matchStyle.pattern);
    for (let i=1; i<result.length; i+=2) {
      result[i] = <Text key={'richText'+i} style={matchStyle.style}>#{result[i]}</Text>
    }
    return result;
  }

  render() {
    // console.log('selection',this.state.selection.start, this.state.selection.end)
    // console.log('text', this.state.text)
    // console.log('RichTextInput rerender')
    return (
      // <TextInput {...this.props} ref={this.richTextInput} onChangeText={this.enrichText}/>
      // <TextInput {...this.props} onChangeText={this.enrichText}>
      //   <Text ref={this.richTextInput}></Text>
      // </TextInput>
      <TextInput
        {...this.props}
        onChangeText={this.enrichTextDebounced}
        // onSelectionChange={this.setSelectionPos}
      >
        <Text>{this.state.richText}</Text>
        {/* <RichText matchStyles={this.props.matchStyles}>{this.state.text}</RichText> */}
      </TextInput>
    );
  }

}

const RichText3 = (props) => {
  const enrichText = (text) => {
    // Enrichment
    return text;
  }
  richText = enrichText(props.children)
  return <Text>{props.children}</Text>
}
