import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useState } from "react";
import { fetchDataAction } from "../../redux/actions/fetchData";
import { getLogs, getFetchStatus } from "../../redux/selectors/logsSelectors";
import { LogItem } from "../LogItem/LogItem";
import { Statistics } from "../Statistics/Statistics";
import "./styles.css";
import { caluclateStatistics } from "../../utils/calculateStatistics";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const logs = useSelector(getLogs);
  const fetchStatus = useSelector(getFetchStatus);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [noMoraDataMessage, setNoMoreDataMessage] = useState<boolean>(false);

  useEffect(() => {
    if (fetchStatus === "fulfilled") {
      setLoading(false);
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
    scrollContainer: "parent",
  });

  if (fetchStatus === "rejected") {
    return <div>ERROR</div>;
  }
  return (
    <div>
      <div className="MainContainer">
        <div className="ListContainer">
          <ul
            className="List"
            ref={infiniteRef as React.RefObject<HTMLUListElement>}
          >
            {logs.data.map((log, id) => {
              return <LogItem key={id} {...log} />;
            })}
            {noMoraDataMessage && <div>THERE'S NO MORE DATA TO SHOW</div>}
          </ul>
        </div>
        <div className="Loading">
          {fetchStatus === "initial" || fetchStatus === "pending"
            ? "...LOADING"
            : " "}
        </div>
        {logs.data.length > 1 && <Statistics data={logs.data} />}
      </div>
    </div>
  );
};

export default Dashboard;
