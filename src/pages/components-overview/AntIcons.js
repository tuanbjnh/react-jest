// material-ui
import { styled } from '@mui/material/styles';

// project import
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from '../../components/MainCard';

// styles
const IFrameWrapper = styled('iframe')(() => ({
    height: 'calc(100vh - 210px)',
    border: 'none'
}));

// ============================|| ANT ICONS ||============================ //

const AntIcons = () => (
    <ComponentSkeleton>
        <MainCard title="ReactJs">
            <IFrameWrapper title="ReactJs" width="100%" src="https://reactjs.org/" />
        </MainCard>
    </ComponentSkeleton>
);

export default AntIcons;
