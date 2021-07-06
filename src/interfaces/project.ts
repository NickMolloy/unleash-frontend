import { IFeatureToggleListItem } from './featureToggle';

export interface IProjectCard {
    name: string;
    id: string;
}

export interface IProject {
    members: number;
    version: string;
    name: string;
    description: string;
    health: number;
    features: IFeatureToggleListItem[];
}