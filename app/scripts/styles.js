//Colors at http://www.color-hex.com/color-palette/17804
// http://www.0to255.com/
export const Colors = {
  text: {
    soft: 'rgba(0, 0, 0, 0.68)',
    toString: ()=>'rgba(0, 0, 0, 0.75)',
    strong: 'rgba(0, 0, 0, 0.88)',
    onDark: {
      soft: 'rgba(255, 255, 255, 0.68)',
      toString: ()=>'rgba(255, 255, 255, 0.78)',
      strong: 'rgba(255, 255, 255, 0.88)',
    }
  },
  primary: {
    xLight: '#a16fbe',
    light: '#9157b4',
    toString: ()=>'#8048A1',
    dark: '#6d3e8a',
    xDark: '#5b3372',
  },
  grey: {
    xLight: '#f6f6f6',
    light: '#e5e5e5',
    toString: ()=>'#d4d4d4',
    dark: '#c3c3c3',
    xDark: '#b2b2b2',
  },
  green: {
    xLight: '#b7d47a',
    light: '#a9cb61',
    toString: ()=>'#9bc347',
    dark: '#89af39',
    xDark: '#759531',
  },
  blue: {
    xLight: '#7dbad4',
    light: '#64adcb',
    toString: ()=>'#4a9fc3',
    dark: '#3b8db1',
    xDark: '#327997',
  },
  yellow: {
    xLight: '#dfcf78',
    light: '#d9c55c',
    toString: ()=>'#d2bb41',
    dark: '#c3ab2e',
    xDark: '#a79328',
  },
  red: {
    xLight: '#d77676',
    light: '#cf5c5c',
    toString: ()=>'#c74242',
    dark: '#b23535',
    xDark: '#982d2d',
  },
  overlay: {
    light: 'rgba(255, 255, 255, 0.06)',
    dark: 'rgba(0, 0, 0, 0.06)',
  },
};

export const MemoryMatchStyles = [
  {
    match:/#(\w+)/g, style: { // Hashtag
      color: Colors.red.light
    }
  }
];

export default {
  colors: Colors,
  memoryMatchStyles: MemoryMatchStyles,
}
