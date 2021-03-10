import React, { FC, memo } from "react";
import { LogsProps } from "../../redux/reducers/dataReducer";

import Container from "@material-ui/core/Container";

export const LogItem: FC<Partial<LogsProps>> = memo(
  ({ date, severity, message }) => {
    return (
      <Container>
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
