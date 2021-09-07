import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    IconButton,
} from '@material-ui/core';
import { CloudCircle, Delete, DragIndicator, Edit } from '@material-ui/icons';
import ConditionallyRender from '../../../common/ConditionallyRender';

import { IEnvironment } from '../../../../interfaces/environments';
import React, { useContext, useRef } from 'react';
import AccessContext from '../../../../contexts/AccessContext';
import {
    DELETE_ENVIRONMENT,
    UPDATE_ENVIRONMENT,
} from '../../../AccessProvider/permissions';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';

interface IEnvironmentListItemProps {
    env: IEnvironment;
    setSelectedEnv: React.Dispatch<React.SetStateAction<IEnvironment>>;
    setDeldialogue: React.Dispatch<React.SetStateAction<boolean>>;
    setEditEnvironment: React.Dispatch<React.SetStateAction<boolean>>;
    index: number;
    moveListItem: any;
}

interface DragItem {
    index: number;
    id: string;
    type: string;
}

const EnvironmentListItem = ({
    env,
    setSelectedEnv,
    setDeldialogue,
    index,
    moveListItem,
    setEditEnvironment,
}: IEnvironmentListItemProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const ACCEPT_TYPE = 'LIST_ITEM';
    const [{ handlerId }, drop] = useDrop({
        accept: ACCEPT_TYPE,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: DragItem, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY =
                (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveListItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ACCEPT_TYPE,
        item: () => {
            return { env, index };
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    const { hasAccess } = useContext(AccessContext);

    return (
        <ListItem
            style={{ position: 'relative', opacity }}
            ref={ref}
            data-handler-id={handlerId}
        >
            <ListItemIcon>
                <CloudCircle />
            </ListItemIcon>
            <ListItemText
                primary={<strong>{env.name}</strong>}
                secondary={env.displayName}
            />

            <Tooltip title="Drag to reorder">
                <IconButton>
                    <DragIndicator />
                </IconButton>
            </Tooltip>
            <ConditionallyRender
                condition={hasAccess(UPDATE_ENVIRONMENT)}
                show={
                    <Tooltip title="Update environment">
                        <IconButton
                            aria-label="update"
                            onClick={() => {
                                setSelectedEnv(env);
                                setEditEnvironment(prev => !prev);
                            }}
                        >
                            <Edit />
                        </IconButton>
                    </Tooltip>
                }
            />
            <ConditionallyRender
                condition={hasAccess(DELETE_ENVIRONMENT)}
                show={
                    <Tooltip title="Delete environment">
                        <IconButton
                            aria-label="delete"
                            onClick={() => {
                                setDeldialogue(true);
                                setSelectedEnv(env);
                            }}
                        >
                            <Delete />
                        </IconButton>
                    </Tooltip>
                }
            />
        </ListItem>
    );
};

export default EnvironmentListItem;
