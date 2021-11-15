import React, { useCallback, useState } from 'react';
import {
  Modal,
  Typography,
  Box,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { addMedication } from '../../actions';
import ReactCron from './ReactCron';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

function AddMedication({ open, handleClose, addMedication }) {
  const [value, setValue] = useState(new Date('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const defaultValue = '30 12 * * *';
  const [cronValue, setCronValue] = useState(defaultValue);
  const [textValue, setTextValue] = useState('');
  const customSetValue = useCallback(
    (newValue) => {
      setCronValue(newValue);
      setTextValue(newValue);
    },
    [setTextValue]
  );
  const [error, onError] = useState();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Formik
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            avatarUrl: ''
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Must be a valid email')
              .max(255)
              .required('Email is required'),
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            address: Yup.string().required('Required'),
            phone: Yup.string().required('Required')
          })}
          onSubmit={async (values) => {
            const avatar =
              values.avatarUrl.length > 0
                ? values.avatarUrl
                : 'https://www.gravatar.com/avatar/';
            await addMedication(
              values.firstName,
              values.lastName,
              values.email,
              values.address,
              values.phone,
              avatar,
              cronValue
            );
            handleClose();
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
              <TextField
                error={Boolean(touched.firstName && errors.firstName)}
                fullWidth
                helperText={touched.firstName && errors.firstName}
                label="First Name"
                margin="normal"
                name="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.firstName}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.lastName && errors.lastName)}
                fullWidth
                helperText={touched.lastName && errors.lastName}
                label="Last Name"
                margin="normal"
                name="lastName"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.lastName}
                variant="outlined"
              />
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
                error={Boolean(touched.address && errors.address)}
                fullWidth
                helperText={touched.address && errors.address}
                label="address"
                margin="normal"
                name="address"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.address}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.phone && errors.phone)}
                fullWidth
                helperText={touched.phone && errors.phone}
                label="Phone"
                margin="normal"
                name="phone"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.phone}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.avatarUrl && errors.avatarUrl)}
                fullWidth
                helperText={touched.avatarUrl && errors.avatarUrl}
                label="Avatar URL"
                margin="normal"
                name="avatarUrl"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.avatarUrl}
                variant="outlined"
              />
              <ReactCron
                value={cronValue}
                customSetValue={customSetValue}
                onError={onError}
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
                  Add Medication
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}

export default connect(null, { addMedication })(AddMedication);
