import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { connect } from 'react-redux';
import Register from './Register';
import { loginUser, fetchUser } from '../actions';
import GoogleIcon from '../icons/Google';
import './Login.css';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BASE_URL_PROD
    : process.env.REACT_APP_BASE_URL_DEV;

const Login = ({ user, loginUser, fetchUser }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const isLoggedIn = () =>
    (user && Object.keys(user).length > 0) || localStorage.getItem('token');

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    isLoggedIn() && navigate('/');
  });

  return (
    <>
      <Helmet>
        <title>{isLogin ? 'Login' : 'Register'}</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          {isLogin ? (
            <>
              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email('Must be a valid email')
                    .max(255)
                    .required('Email is required'),
                  password: Yup.string()
                    .max(255)
                    .required('Password is required')
                })}
                onSubmit={async (values) => {
                  await loginUser(values.email, values.password);
                  navigate('/dashboard', { replace: true });
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={12}>
                        <Button
                          fullWidth
                          startIcon={<GoogleIcon />}
                          size="large"
                          variant="contained"
                        >
                          <a href={`${baseUrl}/auth/google`}>
                            Login with Google
                          </a>
                        </Button>
                      </Grid>
                    </Grid>
                    <Box
                      sx={{
                        pb: 1,
                        pt: 3
                      }}
                    >
                      <Typography
                        align="center"
                        color="textSecondary"
                        variant="body1"
                      >
                        or {isLogin ? 'Login' : 'Register'} with email address
                      </Typography>
                    </Box>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label="Email Address"
                      margin="normal"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      helperText={touched.password && errors.password}
                      label="Password"
                      margin="normal"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    <Box sx={{ py: 2 }}>
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Sign in now
                      </Button>
                    </Box>
                    <Typography color="textSecondary" variant="body1">
                      Don&apos;t have an account?{' '}
                      <Link
                        variant="h6"
                        underline="hover"
                        onClick={() => setIsLogin(false)}
                        className="login-link"
                      >
                        Sign up
                      </Link>
                    </Typography>
                  </form>
                )}
              </Formik>
            </>
          ) : (
            <Register setIsLogin={setIsLogin} />
          )}
        </Container>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { loginUser, fetchUser })(Login);
