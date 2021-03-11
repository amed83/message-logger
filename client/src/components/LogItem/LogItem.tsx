import { FC, memo } from 'react';
import { LogsProps } from '../../models/models';
import { LogItemContainerStyles } from './styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
export const LogItem: FC<Partial<LogsProps>> = memo(
  ({ date, severity, message }) => {
    const classes = LogItemContainerStyles();
    return (
      <List className={classes.root}>
        <ListItem>
          <strong>Date:</strong>&nbsp;{date}
        </ListItem>
        <ListItem>
          <strong>Severity:</strong>&nbsp;
          {severity.charAt(0).toUpperCase() + severity.slice(1)}
        </ListItem>
        <ListItem>
          <strong>Message:</strong>&nbsp;{message}
        </ListItem>
      </List>
    );
  },
);
