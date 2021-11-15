import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Logo from './Logo';

const MainNavbar = (props) => (
  <AppBar elevation={0} {...props}>
    <Toolbar sx={{ height: 64 }}>
      <RouterLink to="/">
        {/* <Logo /> */}
        <Typography variant="h4">UHG Optum</Typography>
      </RouterLink>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
