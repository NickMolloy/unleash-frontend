import { SyntheticEvent, VFC } from 'react';
import { ActionCell } from '../../../common/Table/cells/ActionCell/ActionCell';
import { Undo } from '@mui/icons-material';
import PermissionIconButton from '../../../common/PermissionIconButton/PermissionIconButton';
import { UPDATE_FEATURE } from '../../../providers/AccessProvider/permissions';

interface IReviveArchivedFeatureCell {
    onRevive: (event: SyntheticEvent<Element, Event>) => void;
    project: string;
}

export const ReviveArchivedFeatureCell: VFC<IReviveArchivedFeatureCell> = ({
    onRevive,
    project,
}) => {
    return (
        <ActionCell>
            <PermissionIconButton
                onClick={onRevive}
                projectId={project}
                permission={UPDATE_FEATURE}
                tooltipProps={{ title: 'Revive feature' }}
            >
                <Undo />
            </PermissionIconButton>
        </ActionCell>
    );
};
