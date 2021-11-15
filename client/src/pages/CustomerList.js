import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from '../components/customer/CustomerListResults';
import CustomerListToolbar from '../components/customer/CustomerListToolbar';
import customers from '../__mocks__/customers';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserList } from '../actions';
// import MedicationListResults from 'src/components/customer/MedicationListResults';

const CustomerList = ({ fetchUserList, medication }) => {
  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  return (
    <>
      <Helmet>
        <title>Medications</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          {medication?.userList?.length > 0 && (
            <Box sx={{ pt: 3 }}>
              <CustomerListResults medications={medication.userList} />
              {/* <MedicationListResults medications={medication.userList} /> */}
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  medication: state.medication
});

export default connect(mapStateToProps, { fetchUserList })(CustomerList);
