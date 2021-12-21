import { useContext, useEffect, useState } from 'react';

import FormTemplate from '../../../common/FormTemplate/FormTemplate';

import useProjectRolesApi from '../../../../hooks/api/actions/useProjectRolesApi/useProjectRolesApi';

import { useHistory, useParams } from 'react-router-dom';
import ProjectRoleForm from '../ProjectRoleForm/ProjectRoleForm';
import useProjectRoleForm from '../hooks/useProjectRoleForm';
import useProjectRole from '../../../../hooks/api/getters/useProjectRole/useProjectRole';
import { IPermission } from '../../../../interfaces/project';
import UIContext from '../../../../contexts/UIContext';

const EditProjectRole = () => {
    const { setUpdatedResource } = useContext(UIContext);
    const [initialCheckedPermissions, setInitialCheckedPermissions] = useState(
        {}
    );

    const { id } = useParams();
    const { role } = useProjectRole(id);

    useEffect(() => {
        const initialCheckedPermissions = role?.permissions?.reduce(
            (acc: { [key: string]: IPermission }, curr: IPermission) => {
                acc[curr.id] = curr;
                return acc;
            },
            {}
        );

        setInitialCheckedPermissions(initialCheckedPermissions);
    }, [role]);

    const history = useHistory();
    const {
        roleName,
        roleDesc,
        setRoleName,
        setRoleDesc,
        checkedPermissions,
        handlePermissionChange,
        checkAllProjectPermissions,
        checkAllEnvironmentPermissions,
        getProjectRolePayload,
        validatePermissions,
        validateName,
        errors,
        clearErrors,
    } = useProjectRoleForm(
        role.name,
        role.description,
        initialCheckedPermissions
    );

    const { refetch } = useProjectRole(id);
    const { editRole, loading } = useProjectRolesApi();

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = getProjectRolePayload();

        const validName = validateName();
        const validPermissions = validatePermissions();

        if (validName && validPermissions) {
            try {
                await editRole(id, payload);
                refetch();
                history.push('/admin/roles');
                setUpdatedResource({
                    title: 'Project role updated',
                    text: 'Your role changes will automatically be applied to the users with this role.',
                    show: true,
                });
            } catch (e) {
                console.log('Something went wrong');
            }
        }
    };

    const handleCancel = () => {
        history.push('/admin/roles');
    };

    return (
        <FormTemplate
            loading={loading}
            title="Edit project role"
            description="A project role can be
customised to limit access
to resources within a project"
            documentationLink="https://docs.getunleash.io/"
        >
            <ProjectRoleForm
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                roleName={roleName}
                setRoleName={setRoleName}
                roleDesc={roleDesc}
                setRoleDesc={setRoleDesc}
                checkedPermissions={checkedPermissions}
                handlePermissionChange={handlePermissionChange}
                checkAllProjectPermissions={checkAllProjectPermissions}
                checkAllEnvironmentPermissions={checkAllEnvironmentPermissions}
                submitButtonText="Edit"
                errors={errors}
                clearErrors={clearErrors}
            />
        </FormTemplate>
    );
};

export default EditProjectRole;
