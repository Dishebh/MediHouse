import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import { People } from '@material-ui/icons';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const TotalProfit = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            TOTAL PATIENTS
          </Typography>
          <Typography color="textPrimary" variant="h3">
            1,171
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: indigo[600],
              height: 56,
              width: 56
            }}
          >
            <People />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default TotalProfit;
