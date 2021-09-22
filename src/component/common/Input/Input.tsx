import { TextField } from '@material-ui/core';
import { useStyles } from './Input.styles.ts';

interface IInputProps {
    label: string;
    placeholder?: string;
    error?: boolean;
    errorText?: string;
    style?: Object;
    className?: string;
    value: string;
    onChange: (e: any) => any;
    onFocus?: (e: any) => any;
    onBlur?: (e: any) => any;
}

const Input = ({
    label,
    placeholder,
    error,
    errorText,
    style,
    className,
    value,
    onChange,
    ...rest
}: IInputProps) => {
    const styles = useStyles();
    return (
        <div className={styles.inputContainer} data-loading>
            <TextField
                size="small"
                variant="outlined"
                label={label}
                placeholder={placeholder}
                error={error}
                helperText={errorText}
                style={style}
                className={className ? className : ''}
                value={value}
                onChange={onChange}
                FormHelperTextProps={{
                    classes: {
                        root: styles.helperText,
                    },
                }}
                {...rest}
            />
        </div>
    );
};

export default Input;