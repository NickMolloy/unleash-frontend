import { useContext, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import AccessContext from '../../../../../contexts/AccessContext';
import usePagination from '../../../../../hooks/usePagination';
import { ADMIN } from '../../../../providers/AccessProvider/permissions';
import PaginateUI from '../../../../common/PaginateUI/PaginateUI';
import ProjectRoleListItem from './ProjectRoleListItem/ProjectRoleListItem';
import useProjectRoles from '../../../../../hooks/api/getters/useProjectRoles/useProjectRoles';
import { IProjectRole } from '../../../../../interfaces/role';
import useProjectRolesApi from '../../../../../hooks/api/actions/useProjectRolesApi/useProjectRolesApi';
import useToast from '../../../../../hooks/useToast';
import ProjectRoleDeleteConfirm from '../ProjectRoleDeleteConfirm/ProjectRoleDeleteConfirm';

const ROOTROLE = 'root';

const ProjectRoleList = () => {
    const { hasAccess } = useContext(AccessContext);
    const { roles } = useProjectRoles();
    const { page, pages, nextPage, prevPage, setPageIndex, pageIndex } =
        usePagination(roles, 10);
    const { deleteRole } = useProjectRolesApi();
    const { refetch } = useProjectRoles();
    const [currentRole, setCurrentRole] = useState<IProjectRole | null>(null);
    const [delDialog, setDelDialog] = useState(false);
    const [confirmName, setConfirmName] = useState('');
    const { setToastData, setToastApiError } = useToast();

    const deleteProjectRole = async () => {
        if (!currentRole?.id) return;
        try {
            await deleteRole(currentRole?.id);
            refetch();
            setToastData({
                type: 'success',
                title: 'Successfully deleted role',
                text: 'Your role is now deleted',
            });
        } catch (e) {
            setToastApiError(e.toString());
        }
        setDelDialog(false);
        setConfirmName('');
    };

    const renderRoles = () => {
        return page
            .filter(role => role.type !== ROOTROLE)
            .map((role: IProjectRole) => {
                return (
                    <ProjectRoleListItem
                        id={role.id}
                        name={role.name}
                        type={role.type}
                        description={role.description}
                        setCurrentRole={setCurrentRole}
                        setDelDialog={setDelDialog}
                    />
                );
            });
    };

    if (!roles) return null;

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Project Role</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">
                            {hasAccess(ADMIN) ? 'Action' : ''}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{renderRoles()}</TableBody>
                <PaginateUI
                    pages={pages}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    nextPage={nextPage}
                    prevPage={prevPage}
                />
            </Table>
            <br />
            <ProjectRoleDeleteConfirm
                role={currentRole}
                open={delDialog}
                setDeldialogue={setDelDialog}
                handleDeleteRole={deleteProjectRole}
                confirmName={confirmName}
                setConfirmName={setConfirmName}
            />
        </div>
    );
};

export default ProjectRoleList;
