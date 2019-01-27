const rgba = (r, g, b) => (opacity = 0.9) => `rgba(${r}, ${g}, ${b}, ${opacity})` // eslint-disable-line id-length

const PALETTE = {
  purple: {
    light: '#DC6BFF',
    dark: '#C448EA',
  },
  turquoise: {
    light: '#3BE2BE',
    dark: '#35BA9D',
  },
  blueGreen: {
    light: '#7ed6df',
    dark: '#22a6b3',
  },
  green: {
    light: '#badc58',
    dark: '#6ab04c',
  },
  red: {
    light: '#ff7979',
    dark: '#eb4d4b',
  },
  yellow: {
    light: '#f6e58d',
    dark: '#f9ca24',
  },
  orange: {
    light: '#ffbe76',
    dark: '#f0932b',
  },
  deepBlue: {
    light: '#30336b',
    dark: '#130f40',
  },
  blueGrey: {
    light: '#dff9fb',
    dark: '#c7ecee',
  },
  deepGrey: {
    light: '#95afc0',
    dark: '#535c68',
  },
  lightGrey: {
    light: '#eeeeee',
    dark: '#dddddd',
  },
  white: {
    light: '#ffffff',
    dark: '#f0f0f0',
    _transparent: rgba(255, 255, 255),
  },
  black: {
    light: '#0f0f0f',
    dark: '#000000',
    _transparent: rgba(0, 0, 0),
  },
}

export const Colors = {
  ...PALETTE,
  text: {
    soft: PALETTE.black._transparent(0.6),
    default: PALETTE.black._transparent(0.75),
    strong: PALETTE.black._transparent(0.9),
    onDark: {
      soft: PALETTE.white._transparent(0.6),
      default: PALETTE.white._transparent(0.75),
      strong: PALETTE.white._transparent(0.9),
    },
  },
  primary: PALETTE.turquoise,
  background: PALETTE.white.light,
  border: PALETTE.lightGrey.light,
  overlay: {
    white: PALETTE.white._transparent(0.06),
    black: PALETTE.black._transparent(0.06),
  },
  header: {
    light: PALETTE.white.light,
  },
  tabBar: {
    activeIcon: PALETTE.turquoise.light,
    inactiveIcon: PALETTE.lightGrey.dark,
    background: PALETTE.white.light,
  },
  statusBar: PALETTE.turquoise.dark,
  fab: {
    background: PALETTE.turquoise.light,
    icon: PALETTE.white._transparent(0.75),
  },
}
