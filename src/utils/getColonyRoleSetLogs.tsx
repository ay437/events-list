import { ColonyClient } from '@colony/colony-js';
import { getLogs, getBlockTime } from '@colony/colony-js';

const getColonyRoleSetLogs = async (colonyClient: ColonyClient) => {
  const eventFilter = colonyClient.filters.ColonyRoleSet();

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

export default getColonyRoleSetLogs;
