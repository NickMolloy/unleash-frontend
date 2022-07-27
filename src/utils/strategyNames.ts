import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import LanguageIcon from '@mui/icons-material/Language';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import CodeIcon from '@mui/icons-material/Code';
import { ReactComponent as RolloutIcon } from 'assets/icons/rollout.svg';
import { ElementType } from 'react';

export const formatStrategyName = (strategyName: string): string => {
    return formattedStrategyNames[strategyName] ?? strategyName;
};

export const getFeatureStrategyIcon = (strategyName: string): ElementType => {
    switch (strategyName) {
        case 'default':
            return PowerSettingsNewIcon;
        case 'remoteAddress':
            return LanguageIcon;
        case 'flexibleRollout':
            return RolloutIcon;
        case 'userWithId':
            return PeopleIcon;
        case 'applicationHostname':
            return LocationOnIcon;
        default:
            return CodeIcon;
    }
};

const formattedStrategyNames: Record<string, string> = {
    applicationHostname: 'Hosts',
    default: 'Standard',
    flexibleRollout: 'Gradual rollout',
    gradualRolloutRandom: 'Randomized',
    gradualRolloutSessionId: 'Sessions',
    gradualRolloutUserId: 'Users',
    remoteAddress: 'IPs',
    userWithId: 'UserIDs',
};
