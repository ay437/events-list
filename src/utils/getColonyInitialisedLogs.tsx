import connectColonyClient from './connectColonyClient';
import { getLogs, getBlockTime } from '@colony/colony-js';

const getColonyInitialisedLogs = async () => {
  const colonyClient = await connectColonyClient();

  const eventFilter = colonyClient.filters.ColonyInitialised(null, null);

  const eventLogs = await getLogs(colonyClient, eventFilter);

  const parsedLogs = eventLogs.map((event) =>
    colonyClient.interface.parseLog(event)
  );

  const formattedLogs = await Promise.all(
    parsedLogs.map(async (eventLog) => {
      const logTime = await getBlockTime(
        colonyClient.provider,
        eventLog.blockHash
      );
      return { ...eventLog, logTime };
    })
  );
  return formattedLogs;
};

export default getColonyInitialisedLogs;
