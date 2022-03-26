import { createMuiTheme } from '@material-ui/core/styles';
import { HexToRGB, MQ } from './Utils';

const customTheme = createMuiTheme({
  typography: {
    fontFamily: [process.env.FONT_NAME].join(','),
  },
  palette: {
    primary: {
      main: process.env.COLOR_PRIMARY,
      contrastText: process.env.COLOR_TEXT_ON_PRIMARY,
    },
    secondary: {
      main: process.env.COLOR_SECONDARY,
      contrastText: process.env.COLOR_TEXT_ON_SECONDARY,
    },
  },
  overrides: {
    MuiFormControl: {
      root: {
        margin: '10px 0',
        '& .Custom-Label': {
          color: process.env.COLOR_TEXT_ON_SECONDARY,
          marginBottom: 12,
          fontSize: 13,
        },
        '& .MuiFormControl-root': {
          margin: 0,
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 10,
        '&$focused $notchedOutline': {
          borderColor: process.env.COLOR_TEXT_ON_SECONDARY,
        },
        '&:hover $notchedOutline': {
          borderColor: process.env.COLOR_TEXT_ON_SECONDARY,
        },
        '&$disabled $notchedOutline': {
          borderColor: process.env.COLOR_SECONDARY,
        },
        '& .CustomStartIcon': {
          minWidth: 22,
        },
      },
      inputAdornedStart: {
        paddingLeft: 12,
      },
      input: {
        padding: '16px 14px',
      },
      notchedOutline: {
        borderColor: process.env.COLOR_SECONDARY,
      },
    },
    MuiTextField: {
      root: {
        borderRadius: 20,
        '&.MenuSearch': {
          '& .MuiInputBase-root': {
            height: 34,
            width: 200,
            fontSize: 13,
            fontWeight: 300,
            color: process.env.COLOR_WHITE,
            backgroundColor:
              'rgba(' + HexToRGB(process.env.COLOR_WHITE) + ',.5)',
            borderRadius: 20,
            '&:not(.Mui-focused)': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
            },
          },
          '& input': {
            '&::placeholder': {
              color: process.env.COLOR_WHITE,
              opacity: 1,
            },
          },
        },
      },
    },
    MuiInputBase: {
      root: {
        backgroundColor: process.env.COLOR_SECONDARY,
        boxShadow: 'inset 0px 2px 5px rgba(121, 122, 155, 0.1)',
      },
      input: {
        '&$disabled': {
          '&.Blacked': {
            color: '#000!important',
          },
        },
      },
    },
    MuiTableHeader: {
      root: { fontWeight: 'bold' },
    },
    MuiTableCell: {
      root: { fontSize: '13px' },
    },
    MuiButton: {
      root: {
        borderRadius: 40,
        textTransform: 'capitalize',
        fontWeight: 400,
        fontSize: 14,
        padding: '8px 20px',
        '&.Auth': {
          padding: '12px 20px',
        },
        '&.Register': {
          boxShadow: 'none',
          marginRight: 10,
          display: 'none',
          backgroundColor: 'rgba(' + HexToRGB(process.env.COLOR_WHITE) + ',.1)',
          color: '#fff',
          [MQ('768')]: {
            display: 'inline-block',
          },
        },
      },
      outlined: {
        padding: '8px 20px',
      },
      containedSizeSmall: {
        padding: '5px 10px',
      },
      containedPrimary: {
        background: `linear-gradient(180deg, ${process.env.COLOR_PRIMARY} 0%, ${process.env.COLOR_PRIMARY_TWO} 100%)`,
      },
      contained: {
        '&$disabled': {
          background: process.env.COLOR_SECONDARY,
        },
      },
    },
    MuiAutocomplete: {
      inputRoot: {
        '& .MuiAutocomplete-input': {
          padding: '7.7px 4px!important',
        },
      },
    },
    MuiDialog: {
      paper: {
        borderRadius: 24,
      },
    },
    MuiPopover: {
      paper: {
        '&.UserMenu': {
          marginTop: 50,
          marginLeft: -20,
          borderRadius: '20px 0px 20px 20px',
          overflowY: 'visible',
          overflowX: 'visible',
          boxShadow:
            '0px 5px 15px -10px rgb(0 0 0 / 20%), 0px 18px 20px 1px rgb(0 0 0 / 7%), 0px 33px 34px 2px rgb(0 0 0 / 8%)',
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: 14,
      },
    },
  },
});

export default customTheme;
