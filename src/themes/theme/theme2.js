// ==============================|| DARK MODE THEME - THEME SELECTOR ||============================== //

export default function Theme(colors) {
  const { blue, red, gold, cyan, green, grey } = colors;
  const greyColors = {
    0: '#212121', // Darker base background
    50: '#424242', 
    100: '#616161',
    200: '#757575',
    300: '#9e9e9e',
    400: '#bdbdbd',
    500: '#e0e0e0', // Light grey for text
    600: '#eeeeee',
    700: '#f5f5f5',
    800: '#fafafa',
    900: '#ffffff', // Lightest for contrast
    A50: '#1c1c1c', // Accent dark shade
    A100: '#2c2c2c',
    A200: '#333333',
    A400: '#484848',
    A700: '#5f5f5f',
    A800: '#737373'
  };
  const contrastText = '#ffffff'; // White for contrast in dark mode

  return {
    primary: {
      lighter: blue[1],
      100: blue[2],
      200: blue[3],
      light: blue[4],
      400: blue[5],
      main: blue[6],
      dark: blue[7],
      700: blue[8],
      darker: blue[9],
      900: blue[10],
      contrastText: greyColors[900]
    },
    secondary: {
      lighter: greyColors[100],
      100: greyColors[200],
      200: greyColors[300],
      light: greyColors[400],
      400: greyColors[500],
      main: greyColors[600],
      dark: greyColors[700],
      800: greyColors[800],
      darker: greyColors[900],
      A100: greyColors[50],
      A200: greyColors.A400,
      A300: greyColors.A700,
      contrastText: greyColors[50]
    },
    error: {
      lighter: red[1],
      light: red[3],
      main: red[5],
      dark: red[7],
      darker: red[9],
      contrastText: greyColors[100]
    },
    warning: {
      lighter: gold[1],
      light: gold[3],
      main: gold[5],
      dark: gold[7],
      darker: gold[9],
      contrastText: greyColors[100]
    },
    info: {
      lighter: cyan[1],
      light: cyan[3],
      main: cyan[5],
      dark: cyan[7],
      darker: cyan[9],
      contrastText: greyColors[100]
    },
    success: {
      lighter: green[1],
      light: green[3],
      main: green[5],
      dark: green[7],
      darker: green[9],
      contrastText: greyColors[100]
    },
    grey: greyColors
  };
}
