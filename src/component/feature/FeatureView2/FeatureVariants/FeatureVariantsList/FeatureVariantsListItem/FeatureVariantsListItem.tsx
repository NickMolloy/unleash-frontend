import { IconButton, Chip, TableCell, TableRow } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

import styles from '../variants.module.scss';
import { IFeatureVariant } from '../../../../../../interfaces/featureToggle';
import ConditionallyRender from '../../../../../common/ConditionallyRender';
import { weightTypes } from '../../../../variant/enums';

interface IFeatureVariantListItem {
    variant: IFeatureVariant;
    editVariant: any;
    removeVariant: any;
    editable: boolean;
}

const FeatureVariantListItem = ({
    variant,
    editVariant,
    removeVariant,
    editable,
}: IFeatureVariantListItem) => {
    const { FIX } = weightTypes;

    return (
        <TableRow>
            <TableCell onClick={editVariant}>{variant.name}</TableCell>
            <TableCell className={styles.chipContainer}>
                <ConditionallyRender
                    condition={variant.payload}
                    show={<Chip label="Payload" />}
                />
                <ConditionallyRender
                    condition={
                        variant.overrides && variant.overrides.length > 0
                    }
                    show={
                        <Chip
                            style={{
                                backgroundColor: 'rgba(173, 216, 230, 0.2)',
                            }}
                            label="Overrides"
                        />
                    }
                />
            </TableCell>
            <TableCell>{variant.weight / 10.0} %</TableCell>
            <TableCell>
                {variant.weightType === FIX ? 'Fix' : 'Variable'}
            </TableCell>
            <ConditionallyRender
                condition={editable}
                show={
                    <TableCell className={styles.actions}>
                        <div className={styles.actionsContainer}>
                            <IconButton onClick={editVariant}>
                                <Edit />
                            </IconButton>
                            <IconButton onClick={removeVariant}>
                                <Delete />
                            </IconButton>
                        </div>
                    </TableCell>
                }
                elseShow={<TableCell className={styles.actions} />}
            />
        </TableRow>
    );
};

export default FeatureVariantListItem;
