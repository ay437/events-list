import { ColonyClient } from '@colony/colony-js';
import { getLogs, getBlockTime } from '@colony/colony-js';
import { ColonyEventLog } from '../utils/types';
import { EventFilter } from 'ethers';
import { LogDescription } from 'ethers/utils';
import { Log } from 'ethers/providers/abstract-provider';

const getColonyInitialisedLogs = async (colonyClient: ColonyClient) => {
  const eventFilter: EventFilter = colonyClient.filters.ColonyInitialised(
    null,
    null
  );

  const eventLogs: Array<Log> = await getLogs(colonyClient, eventFilter);

  const parsedLogs: Array<LogDescription> = eventLogs.map((event) =>
    colonyClient.interface.parseLog(event)
  );

  let mergedLogs: Array<any> = [];

  for (let i = 0; i < eventLogs.length; i++) {
    mergedLogs.push({
      ...eventLogs[i],
      ...parsedLogs[i]
    });
  }

  const formattedLogs: Array<ColonyEventLog> = await Promise.all(
    mergedLogs.map(async (eventLog) => {
      const logTime = await getBlockTime(
        colonyClient.provider,
        eventLog.blockHash || ''
      );
      return {
        ...eventLog,
        logTime
      };
    })
  );
  return formattedLogs;
};

export default getColonyInitialisedLogs;
