import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import AccountProfile from '../components/account/AccountProfile';
import AccountProfileDetails from '../components/account/AccountProfileDetails';
import { connect } from 'react-redux';
import { updateUser } from '../actions';
import { useNavigate } from 'react-router-dom';

const Account = ({ user, updateUser }) => {
  const navigate = useNavigate();

  const isLoggedIn = () =>
    (user && Object.keys(user).length) || localStorage.getItem('token');

  useEffect(() => {
    !isLoggedIn() && navigate('/login');
  });

  return (
    <>
      <Helmet>
        <title>Account</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile updateUser={updateUser} user={user} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails updateUser={updateUser} user={user} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { updateUser })(Account);
