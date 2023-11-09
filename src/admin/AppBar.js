import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';
import { AppBar, TitlePortal } from 'react-admin';

const SettingsButton = () => (
    <IconButton color="inherit">
        <SettingsIcon />
    </IconButton>
);

export const MyAppBar = () => (
    <AppBar sx={{ backgroundColor: "#023047", display: 'flex', alignItems: 'left', justifyContent: 'space-between' }}>
        <img src="https://raw.githubusercontent.com/gwebeer/liveasy-front/img/img/logo_2.png?token=GHSAT0AAAAAACBX6G2WV3TVJILZA5KX6Q2CZCW7ZYA" className='signin-logo' style={{ width: '50px', height: '50px' }} alt="LivEasy Logo" />
        <span> LivEasy </span>
        <TitlePortal />
        <SettingsButton />
    </AppBar>
);
