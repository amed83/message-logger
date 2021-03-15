import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataAction } from '../../redux/actions/fetchData';
import {
  getFetchStatus,
  getLogs,
} from '../../redux/selectors/logsSelectors';

export const useFetchData = (pageIndex) => {
  const dispatch = useDispatch();
  const logs = useSelector(getLogs);
  const fetchStatus = useSelector(getFetchStatus);
  useEffect(() => {
    dispatch(fetchDataAction(pageIndex));
  }, [dispatch, pageIndex]);

  return { logs, fetchStatus };
};
