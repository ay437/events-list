import React, { useEffect } from 'react';
import getColonyRoleSetLogs from './utils/getColonyRoleSetLogs';
import getDomainAddedLogs from './utils/getDomainAddedLogs';
import getPayoutClaimedLogs from './utils/getPayoutClaimedLogs';
import getColonyInitialisedLogs from './utils/getColonyInitialisedLogs';

const App = () => {
  useEffect(() => {
    const logs = async () => {
      const roleLogs = await getColonyRoleSetLogs();
      const daLogs = await getDomainAddedLogs();
      const pcLogs = await getPayoutClaimedLogs();
      const ciLogs = await getColonyInitialisedLogs();
      console.log('role logs: ', roleLogs);
      console.log('da logs: ', daLogs);
      console.log('pc logs: ', pcLogs);
      console.log('ci logs: ', ciLogs);
    };
    logs().catch(console.error);
  }, []);
  return <>hello</>;
};

export default App;
