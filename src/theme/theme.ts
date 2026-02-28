import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#6750A4',
                },
                secondary: {
                    main: '#625B71',
                },
                background: {
                    default: '#F8F9FA',
                    paper: '#FFFFFF',
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    main: '#D0BCFF',
                },
                secondary: {
                    main: '#CCC2DC',
                },
                background: {
                    default: '#1C1B1F',
                    paper: '#1C1B1F',
                },
            }
        }
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
            },
        },
    },
});

export default theme;
