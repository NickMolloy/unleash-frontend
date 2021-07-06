import { useRef, useState } from 'react';
import { Switch, TableCell, TableRow, Snackbar } from '@material-ui/core';
import { useHistory } from 'react-router';
import { getFeatureTypeIcons } from '../../../../utils/get-feature-type-icons';
import { useStyles } from '../FeatureToggleListNew.styles';
import useToggleFeatureByEnv from '../../../../hooks/api/actions/useToggleFeatureByEnv/useToggleFeatureByEnv';
import { Alert } from '@material-ui/lab';
import { IEnvironments } from '../../../../interfaces/featureToggle';
import Toast from '../../../common/Toast/Toast';

interface IFeatureToggleListNewItemProps {
    name: string;
    type: string;
    environments: IEnvironments[];
    projectId: string;
}

const FeatureToggleListNewItem = ({
    name,
    type,
    environments,
    projectId,
}: IFeatureToggleListNewItemProps) => {
    const { toggleFeatureByEnvironment } = useToggleFeatureByEnv(
        projectId,
        name
    );
    const [snackbarData, setSnackbardata] = useState({
        show: false,
        type: 'success',
        text: '',
    });
    const styles = useStyles();
    const history = useHistory();
    const ref = useRef(null);

    const onClick = (e: Event) => {
        if (!ref.current?.contains(e.target)) {
            history.push(`/features/strategies/${name}`);
        }
    };

    const handleToggle = (env: IEnvironments) => {
        toggleFeatureByEnvironment(env.name, env.enabled)
            .then(() => {
                setSnackbardata({
                    show: true,
                    type: 'success',
                    text: 'Successfully updated toggle status.',
                });
            })
            .catch(e => {
                setSnackbardata({
                    show: true,
                    type: 'error',
                    text: e.toString(),
                });
            });
    };

    const hideSnackbar = () => {
        setSnackbardata(prev => ({ ...prev, show: false }));
    };

    const IconComponent = getFeatureTypeIcons(type);

    return (
        <>
            <TableRow onClick={onClick} className={styles.tableRow}>
                <TableCell className={styles.tableCell} align="left">
                    <span data-loading>{name}</span>
                </TableCell>
                <TableCell className={styles.tableCell} align="left">
                    <div className={styles.tableCellType}>
                        <IconComponent data-loading className={styles.icon} />{' '}
                        <span data-loading>{type}</span>
                    </div>
                </TableCell>
                {environments.map((env: IEnvironments) => {
                    return (
                        <TableCell
                            className={styles.tableCell}
                            align="center"
                            key={env.name}
                        >
                            <span data-loading style={{ display: 'block' }}>
                                <Switch
                                    checked={env.enabled}
                                    ref={ref}
                                    onClick={() => handleToggle(env)}
                                />
                            </span>
                        </TableCell>
                    );
                })}
            </TableRow>
            <Toast
                show={snackbarData.show}
                onClose={hideSnackbar}
                text={snackbarData.text}
                type={snackbarData.type}
            />
        </>
    );
};

export default FeatureToggleListNewItem;
