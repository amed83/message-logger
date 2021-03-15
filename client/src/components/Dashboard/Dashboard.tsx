import React from 'react';

import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useState } from 'react';
import { LogItem } from '../LogItem/LogItem';
import { Statistics } from '../Statistics/Statistics';
import './styles.ts';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { ListGridStyle, LoadingContainerStyle } from './styles';
import { useFetchData } from '../customHooks/useFetchData';

export const Dashboard = () => {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const { logs, fetchStatus } = useFetchData(pageIndex);
  const handleLoadMore = () => {
    setPageIndex(pageIndex + 1);
  };
  const infiniteRef = useInfiniteScroll({
    loading: fetchStatus === 'initial' || fetchStatus === 'pending',
    hasNextPage: logs.hasNextPage,
    onLoadMore: handleLoadMore,
    scrollContainer: 'parent',
  });

  if (fetchStatus === 'rejected') {
    return <div>ERROR</div>;
  }
  const gridClasses = ListGridStyle();
  const containerClasses = LoadingContainerStyle();

  return (
    <Container>
      <Grid container justify="center" className={gridClasses.root}>
        {logs.data.length > 0 && (
          <List
            component="nav"
            ref={infiniteRef as React.RefObject<HTMLUListElement>}
          >
            {logs.data.map((log, id) => {
              return <LogItem key={id} {...log} />;
            })}
          </List>
        )}
      </Grid>
      <Container className={containerClasses.root}>
        {!logs.hasNextPage && fetchStatus === 'fulfilled' && (
          <strong>THERE'S NO NEW DATA TO SHOW</strong>
        )}
      </Container>
      <Container className={containerClasses.root}>
        {(fetchStatus === 'initial' || fetchStatus === 'pending') && (
          <strong>...LOADING</strong>
        )}
      </Container>
      {logs.data.length > 1 && <Statistics data={logs.data} />}
    </Container>
  );
};

export default Dashboard;
