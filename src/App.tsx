/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import getAllLogs from './utils/getAllLogs';
import EventListItem from './components/EventListItem';
import styles from './styles.module.css';
import { ColonyEventLog } from './utils/types';
import InfiniteScroll from 'react-infinite-scroll-component';
import uniqid from 'uniqid';

const App = () => {
  const [colonyEventLogs, setColonyEventLogs] = useState<ColonyEventLog[]>();
  const [items, setItems] = useState<ColonyEventLog[]>();
  const [itemsDisplayedCount, setItemsDisplayedCount] = useState<number>(20);

  const SCROLL_DIVISIONS = 20;

  useEffect(() => {
    const logs = async () => {
      const allLogs = await getAllLogs();
      setColonyEventLogs(allLogs);
      setItems(allLogs.slice(0, SCROLL_DIVISIONS));
    };
    logs().catch(Error);
  }, []);

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems(
        items!.concat(
          colonyEventLogs!.slice(
            itemsDisplayedCount,
            itemsDisplayedCount + SCROLL_DIVISIONS
          )
        )
      );
      setItemsDisplayedCount(itemsDisplayedCount + SCROLL_DIVISIONS);
    }, 750);
  };

  return items === undefined ? (
    <div className={styles.loadingMessage}>
      <img
        src="https://assets.website-files.com/61840fafb9a4c433c1470856/618449c323d96ee341096529_logo.svg"
        alt="Colony Logo"
      />
      <p>Awaiting Colony Events...</p>
    </div>
  ) : (
    <div className={styles.page}>
      <ul className={styles.eventsList} key={uniqid()}>
        <InfiniteScroll
          dataLength={items!.length}
          next={fetchMoreData}
          hasMore={true}
          loader={
            items.length === itemsDisplayedCount ? (
              <h4 className={styles.loadMoreResults}>Loading...</h4>
            ) : (
              ''
            )
          }
          key={uniqid()}
        >
          {items?.map((event) => {
            return <EventListItem eventLog={event} id={uniqid()} />;
          })}
        </InfiniteScroll>
      </ul>
    </div>
  );
};

export default App;
