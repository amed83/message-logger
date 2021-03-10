import { Container } from "@material-ui/core";
import { FC, memo } from "react";
import { Containertyles } from "./styles";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
interface StatsProps {
  warning: number;
  info: number;
  error: number;
}

export const Statistics: FC<StatsProps> = memo(({ warning, info, error }) => {
  const classes = Containertyles();
  return (
    <Container className={classes.root}>
      <Typography component="div">
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
