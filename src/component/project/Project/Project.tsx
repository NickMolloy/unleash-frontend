import { useParams } from 'react-router';
import useProject from '../../../hooks/api/getters/useProject/useProject';
import useLoading from '../../../hooks/useLoading';
import ApiError from '../../common/ApiError/ApiError';
import ConditionallyRender from '../../common/ConditionallyRender';
import ProjectFeatureToggles from './ProjectFeatureToggles/ProjectFeatureToggles';
import ProjectInfo from './ProjectInfo/ProjectInfo';

const Project = () => {
    const { id } = useParams<{ id: string }>();
    const { project, error, loading, refetch } = useProject(id);
    const ref = useLoading(loading);
    const { members, features, health } = project;

    console.log(project.features);

    const containerStyles = { marginTop: '1.5rem', display: 'flex' };

    return (
        <div ref={ref}>
            <h1 data-loading>{project?.name}</h1>
            <ConditionallyRender
                condition={error}
                show={
                    <ApiError
                        data-loading
                        style={{ maxWidth: '400px', marginTop: '1rem' }}
                        onClick={refetch}
                        text="Could not fetch project"
                    />
                }
            />
            <div style={containerStyles}>
                <ProjectInfo
                    id={id}
                    memberCount={members}
                    health={health}
                    featureCount={features?.length}
                />
                <ProjectFeatureToggles features={features} loading={loading} />
            </div>
        </div>
    );
};

export default Project;