import { useEffect, useState } from 'react';
import useProjectApi from '../../../../hooks/api/actions/useProjectApi/useProjectApi';
import useProjects from '../../../../hooks/api/getters/useProjects/useProjects';
import { IPermission } from '../../../../interfaces/project';

export interface ICheckedPermission {
    [key: string]: IPermission;
}

const useProjectForm = (
    initialProjectId = '',
    initialProjectName = '',
    initialProjectDesc = ''
) => {
    const [projectId, setProjectId] = useState(initialProjectId);
    const [projectName, setProjectName] = useState(initialProjectName);
    const [projectDesc, setProjectDesc] = useState(initialProjectDesc);
    const [errors, setErrors] = useState({});
    const { validateId } = useProjectApi();

    useEffect(() => {
        setProjectId(initialProjectId);
    }, [initialProjectId]);

    useEffect(() => {
        setProjectName(initialProjectName);
    }, [initialProjectName]);

    useEffect(() => {
        setProjectDesc(initialProjectDesc);
    }, [initialProjectDesc]);

    const getProjectPayload = () => {
        return {
            id: projectId,
            name: projectName,
            description: projectDesc,
        };
    };
    const NAME_EXISTS_ERROR = 'Error: A project with this id already exists.';
    const validateIdUniqueness = async () => {
        try {
            await validateId(getProjectPayload());
        } catch (e: any) {
            if (e.toString().includes(NAME_EXISTS_ERROR)) {
                setErrors(prev => ({
                    ...prev,
                    id: 'A project with this id already exists',
                }));
            }
        }
    };

    const validateName = () => {
        if (projectName.length === 0) {
            setErrors(prev => ({ ...prev, name: 'Name can not be empty.' }));
            return false;
        }
        return true;
    };
    const validateProjectId = () => {
        if (projectId.length === 0) {
            setErrors(prev => ({ ...prev, id: 'id can not be empty.' }));
            return false;
        }
        return true;
    };

    const clearErrors = () => {
        setErrors({});
    };

    return {
        projectId,
        projectName,
        projectDesc,
        setProjectId,
        setProjectName,
        setProjectDesc,
        getProjectPayload,
        validateName,
        validateProjectId,
        validateIdUniqueness,
        clearErrors,
        errors,
    };
};

export default useProjectForm;