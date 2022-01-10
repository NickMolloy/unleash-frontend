import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: theme.palette.primary.main,
        padding: '1rem',
        borderRadius: '3px',
        position: 'relative',
    },
    code: { wordBreak: 'break-all', color: '#fff', whiteSpace: 'pre-wrap' },
    icon: {
        fill: '#fff',
    },
    iconButton: {
        position: 'absolute',
        bottom: '10px',
        right: '20px',
    },
}));