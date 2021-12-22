import { useContext } from 'react';

import FormTemplate from '../../../common/FormTemplate/FormTemplate';
import useProjectRolesApi from '../../../../hooks/api/actions/useProjectRolesApi/useProjectRolesApi';
import { useHistory } from 'react-router-dom';
import ProjectRoleForm from '../ProjectRoleForm/ProjectRoleForm';
import useProjectRoleForm from '../hooks/useProjectRoleForm';
import UIContext from '../../../../contexts/UIContext';
import useUiConfig from '../../../../hooks/api/getters/useUiConfig/useUiConfig';

const CreateProjectRole = () => {
    /* @ts-ignore */
    const { setToastData } = useContext(UIContext);
    const { uiConfig } = useUiConfig();
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
        validateNameUniqueness,
        errors,
        clearErrors,
    } = useProjectRoleForm();

    const { createRole, loading } = useProjectRolesApi();

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        clearErrors();
        const validName = validateName();
        const validPermissions = validatePermissions();

        if (validName && validPermissions) {
            const payload = getProjectRolePayload();
            try {
                await createRole(payload);
                history.push('/admin/roles');
                setToastData({
                    title: 'Project role created',
                    text: 'Now you can start assigning your project roles to project members.',
                    confetti: true,
                    type: 'success',
                    show: true,
                    autoHideDuration: 6000,
                });
            } catch (e) {
                setToastData({
                    title: 'Something went wrong',
                    text: `We had trouble talking to our API. Here's why: ${e.toString()}`,
                    type: 'error',
                    show: true,
                    autoHideDuration: 6000,
                });
            }
        }
    };

    const formatApiCode = () => {
        return `curl --location --request POST '${
            uiConfig.unleashUrl
        }/api/admin/roles' \\
--header 'Authorization: INSERT_API_KEY' \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(getProjectRolePayload(), undefined, 2)}'`;
    };

    const handleCancel = () => {
        history.push('/admin/roles');
    };

    return (
        <FormTemplate
            loading={loading}
            title="Create project role"
            description="A project role can be
customised to limit access
to resources within a project"
            documentationLink="https://docs.getunleash.io/"
            formatApiCode={formatApiCode}
        >
            <ProjectRoleForm
                errors={errors}
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
                submitButtonText="Create"
                clearErrors={clearErrors}
                validateNameUniqueness={validateNameUniqueness}
            />
        </FormTemplate>
    );
};

export default CreateProjectRole;
