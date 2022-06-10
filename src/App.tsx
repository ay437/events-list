import React, { useEffect } from 'react';
import getAllLogs from './utils/getAllLogs';

const App = () => {
  useEffect(() => {
    const logs = async () => {
      const allLogs = await getAllLogs();
      console.log('logs: ', allLogs);
    };
    logs().catch(console.error);
  }, []);
  return <>hello</>;
};

export default App;
