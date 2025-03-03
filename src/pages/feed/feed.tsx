import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders, selectLoadingOrder, selectOrders } from '@slices';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoadingOrder);
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getOrders())} />
  );
};
