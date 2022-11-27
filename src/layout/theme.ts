import {createTheme} from "@material-ui/core";

export const colors = {
    PRIMARY_COLOR: '#cc0000',
    SECONDARY_COLOR: '#b70000',
    PRIMARY_TEXT_COLOR: '#101010',
    FIELD_FOCUS_COLOR: '#0175a7',
    FIELD_SHADOW_COLOR_1: '#2297bf',
    FIELD_SHADOW_COLOR_2: '#091e421f',
    FIELD_SHADOW_COLOR_3: '#091e4214'
};

const theme = createTheme({
    typography: {
        fontFamily: 'HelveticaNeue,"Helvetica Neue",Helvetica,Arial,sans-serif'
    },
    props: {
        MuiButtonBase: {
            disableRipple: true
        }
    },
    overrides: {
        MuiTypography: {
            h3: {
                fontWeight: 100
            }
        },
        MuiSelect: {
            root: {
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: `1px solid ${colors.FIELD_FOCUS_COLOR}`,
                    boxShadow: `0 0 0 .125rem ${colors.FIELD_SHADOW_COLOR_1}, 0 .625rem 1.5rem ${colors.FIELD_SHADOW_COLOR_2}, 0 .25rem .25rem ${colors.FIELD_SHADOW_COLOR_3}`
                }
            }
        },
        MuiTextField: {
            root: {
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: `1px solid ${colors.FIELD_FOCUS_COLOR}`,
                    boxShadow: `0 0 0 .125rem ${colors.FIELD_SHADOW_COLOR_1}, 0 .625rem 1.5rem ${colors.FIELD_SHADOW_COLOR_2}, 0 .25rem .25rem ${colors.FIELD_SHADOW_COLOR_3}`
                }
            }
        },
        MuiChip: {
            root: {
                backgroundColor: colors.PRIMARY_COLOR
            }
        },
        MuiButton: {
            root: {
                textTransform: 'none',
                lineHeight: '22px',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '16px',
                minHeight: '50px'
            },
            containedPrimary: {
                border: `1px solid ${colors.PRIMARY_COLOR}`
            },
            outlinedPrimary: {
                border: `1px solid ${colors.PRIMARY_COLOR}`
            }
        }
    },
    palette: {
        primary: {
            main: colors.PRIMARY_COLOR
        },
        secondary: {
            main: colors.SECONDARY_COLOR
        },
        text: {
            primary: colors.PRIMARY_TEXT_COLOR
        }

    },
});

export default theme;