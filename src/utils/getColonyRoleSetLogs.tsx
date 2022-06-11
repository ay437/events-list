import { ColonyClient, ColonyRole } from '@colony/colony-js';
import { getLogs, getBlockTime } from '@colony/colony-js';
import { ColonyEventLog } from '../utils/types';
import { EventFilter } from 'ethers';
import { BigNumber, LogDescription } from 'ethers/utils';
import { Log } from 'ethers/providers/abstract-provider';

const getColonyRoleSetLogs = async (colonyClient: ColonyClient) => {
  // ColonyRoleSet() was not being found, but it definitely exists in the type definitions hence the below @ts-ignore to supress unneeded error
  // @ts-ignore
  const eventFilter: EventFilter = colonyClient.filters.ColonyRoleSet(
    null,
    null,
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
    mergedLogs.map(async (eventLog, index) => {
      const logTime = await getBlockTime(
        colonyClient.provider,
        eventLog.blockHash || ''
      );
      const formattedDomainId = new BigNumber(
        eventLog.values.domainId
      ).toString();
      const formattedRoleName = ColonyRole[eventLog.values.role];
      return {
        ...eventLog,
        logTime,
        formattedDomainId,
        formattedRoleName
      };
    })
  );
  return formattedLogs;
};

export default getColonyRoleSetLogs;
