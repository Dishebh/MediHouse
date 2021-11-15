import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import AddMedication from './AddMedication';

const CustomerListToolbar = ({ fetchUser, medication }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        {/* <Button>Import</Button>
        <Button sx={{ mx: 1 }}>Export</Button> */}
        <Button onClick={handleOpen} color="primary" variant="contained">
          Add medication
        </Button>
        <AddMedication open={open} handleClose={handleClose} />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search medication"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  medication: state.medication
});

export default CustomerListToolbar;
