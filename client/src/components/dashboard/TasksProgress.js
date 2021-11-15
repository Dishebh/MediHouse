import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { Money } from '@material-ui/icons';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import { DollarSign } from 'react-feather';

const TasksProgress = (props) => (
  <Card sx={{ height: '100%' }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            INSURANCE
          </Typography>
          <Typography color="textPrimary" variant="h3">
            $15.144K
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: orange[600],
              height: 56,
              width: 56
            }}
          >
            <DollarSign />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        {/* <LinearProgress value={75.5} variant="determinate" /> */}
      </Box>
    </CardContent>
  </Card>
);

export default TasksProgress;
