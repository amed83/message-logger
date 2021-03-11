import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useState } from 'react';
import { fetchDataAction } from '../../redux/actions/fetchData';
import {
  getLogs,
  getFetchStatus,
} from '../../redux/selectors/logsSelectors';
import { LogItem } from '../LogItem/LogItem';
import { Statistics } from '../Statistics/Statistics';
import './styles.ts';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { ListGridStyle, LoadingContainerStyle } from './styles';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const logs = useSelector(getLogs);
  const fetchStatus = useSelector(getFetchStatus);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [noMoraDataMessage, setNoMoreDataMessage] = useState<boolean>(
    false,
  );

  useEffect(() => {
    if (fetchStatus === 'fulfilled') {
      setLoading(false);
    }
    if (fetchStatus === 'fulfilled' && !logs.hasNextPage) {
      setNoMoreDataMessage(true);
      setHasNextPage(false);
    }
  }, [fetchStatus]);

  const handleLoadMore = () => {
    dispatch(fetchDataAction(pageIndex));
    setLoading(true);
    setPageIndex(pageIndex + 1);
  };
  const infiniteRef = useInfiniteScroll({
    loading,
    hasNextPage,
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
        <List
          component="nav"
          ref={infiniteRef as React.RefObject<HTMLUListElement>}
        >
          {logs.data.map((log, id) => {
            return <LogItem key={id} {...log} />;
          })}
        </List>
      </Grid>
      <Container className={containerClasses.root}>
        {noMoraDataMessage && (
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
