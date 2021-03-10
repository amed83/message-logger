import React, { useEffect } from "react";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataAction } from "./redux/actions/fetchData";
import { getFetchStatus, getLogs } from "./redux/selectors/logsSelectors";

import useInfiniteScroll from "react-infinite-scroll-hook";
import { useState } from "react";
import { LogItem } from "./components/LogItem/LogItem";
import { Statistics } from "./components/statistics/Statistics";
const App = () => {
  const dispatch = useDispatch();
  const logs = useSelector(getLogs);
  const fetchStatus = useSelector(getFetchStatus);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [noMoraDataMessage, setNoMoreDataMessage] = useState<boolean>(false);

  interface StatsProps {
    warning: number;
    info: number;
    error: number;
  }

  const caluclateStatistics = (): StatsProps => {
    return logs.data.reduce((prev, next) => {
      prev[next.severity] = ++prev[next.severity] || 1;
      return prev;
    }, {} as StatsProps);
  };

  useEffect(() => {
    if (fetchStatus === "fulfilled") {
      setLoading(false);
      caluclateStatistics();
    }
    if (fetchStatus === "fulfilled" && !logs.hasNextPage) {
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
  });

  return (
    <div className="App">
      {logs.data.length > 1 && <Statistics {...caluclateStatistics()} />}
      <ul
        className="Container"
        ref={infiniteRef as React.RefObject<HTMLUListElement>}
      >
        {logs.data.map((log, id) => {
          return <LogItem key={id} {...log} />;
        })}
        {loading && <div>LOADING</div>}
        {noMoraDataMessage && <div>THERE'S NO MORE DATA TO SHOW</div>}
      </ul>
    </div>
  );
};

export default App;
