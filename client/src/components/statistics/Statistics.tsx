import { Container } from '@material-ui/core';
import { FC, memo } from 'react';
import { ContainerStyles } from './styles';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { calculateStatistics } from '../../utils/calculateStatistics';
import { LogsProps } from '../../models/models';

interface DataProps {
  data: LogsProps[];
}

export const Statistics: FC<DataProps> = memo(({ data }) => {
  const { warning, info, error } = calculateStatistics(data);
  const classes = ContainerStyles();
  return (
    <Container className={classes.root}>
      <Typography component="div">
        <Box fontWeight="fontWeightBold" fontSize="h5.fontSize" m={1}>
          Reports
        </Box>
        <Box fontWeight="fontWeightBold" m={1}>
          Warnings: {warning}
        </Box>
        <Box fontWeight="fontWeightBold" m={1}>
          Info: {info}
        </Box>
        <Box fontWeight="fontWeightBold" m={1}>
          Error: {error}
        </Box>
      </Typography>
    </Container>
  );
});
