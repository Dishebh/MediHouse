import { useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import { Logout } from '@material-ui/icons';

const userProfile = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Devusereloper',
  name: 'Katarina Smith'
};

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BASE_URL_PROD
    : process.env.REACT_APP_BASE_URL_DEV;

const items = [
  {
    href: '/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/medications',
    icon: UsersIcon,
    title: 'Medications'
  }
  // {
  //   href: '/products',
  //   icon: ShoppingBagIcon,
  //   title: 'Products'
  // }
  // {
  //   href: '/account',
  //   icon: UserIcon,
  //   title: 'Account'
  // },
  // {
  //   href: '/settings',
  //   icon: SettingsIcon,
  //   title: 'Settings'
  // }
  // {
  //   href: '/login',
  //   icon: LockIcon,
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: UserPlusIcon,
  //   title: 'Register'
  // },
];

const DashboardSidebar = ({ onMobileClose, openMobile, user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = () =>
    (user && Object.keys(user).length) || localStorage.getItem('token');

  const logout = () => {
    document.getElementById('logout-link').click();
    localStorage.removeItem('token');
    navigate('/dashboard');
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {isLoggedIn() && (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            p: 2
          }}
        >
          <Avatar
            component={RouterLink}
            src={user.profilePic || ''}
            sx={{
              cursor: 'pointer',
              width: 64,
              height: 64
            }}
            to="/account"
          />
          <Typography color="textPrimary" variant="h5">
            {user.name}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {userProfile.email || ''}
          </Typography>
        </Box>
      )}
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          {!isLoggedIn() ? (
            <>
              <NavItem
                href="/login"
                key="login"
                title="Login"
                icon={LockIcon}
              />
            </>
          ) : (
            <>
              <a id="logout-link" href={`${baseUrl}/auth/logout`} />
              <NavItem
                href="/account"
                key="account"
                title="Account"
                icon={UserIcon}
              />
              <NavItem
                href="/settings"
                key="settings"
                title="Settings"
                icon={SettingsIcon}
              />
              <NavItem
                onClick={logout}
                href="#"
                key="logout"
                title="Logout"
                icon={Logout}
              />
            </>
          )}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      {/* <Hidden lgUp> */}
      <Drawer
        anchor="left"
        onClose={onMobileClose}
        open={openMobile}
        variant="temporary"
        PaperProps={{
          sx: {
            width: 256
          }
        }}
        sx={{ display: { lg: 'block', md: 'block' } }}
      >
        {content}
      </Drawer>
      {/* </Hidden> */}
      {/* <Hidden xlDown> */}
      <Drawer
        anchor="left"
        open
        variant="persistent"
        PaperProps={{
          sx: {
            width: 256,
            top: 64,
            height: 'calc(100% - 64px)'
          }
        }}
        sx={{
          display: {
            xl: 'block',
            lg: 'block',
            md: 'none',
            sm: 'none',
            xs: 'none'
          }
        }}
      >
        {content}
      </Drawer>
      {/* </Hidden> */}
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { fetchUser })(DashboardSidebar);
