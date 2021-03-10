import { FC, memo } from "react";
import Container from "@material-ui/core/Container";
import { Containertyles } from "./styles";
import { LogsProps } from "../../models/models";

export const LogItem: FC<Partial<LogsProps>> = memo(
  ({ date, severity, message }) => {
    const classes = Containertyles();
    return (
      <Container className={classes.root}>
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Severity:</strong> {severity}
        </p>
        <p>
          <strong>Message:</strong> {message}
        </p>
      </Container>
    );
  }
);
