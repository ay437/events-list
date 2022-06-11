import { ColonyClient } from '@colony/colony-js';
import connectColonyClient from './connectColonyClient';
import getColonyInitialisedLogs from './getColonyInitialisedLogs';
import getColonyRoleSetLogs from './getColonyRoleSetLogs';
import getDomainAddedLogs from './getDomainAddedLogs';
import getPayoutClaimedLogs from './getPayoutClaimedLogs';
import { ColonyEventLog } from './types';

const getAllLogs = async () => {
  const colonyClient: ColonyClient = await connectColonyClient();

  const colonyRoleSetLogs: Array<ColonyEventLog> = await getColonyRoleSetLogs(
    colonyClient
  );

  const payoutClaimedLogs: Array<ColonyEventLog> = await getPayoutClaimedLogs(
    colonyClient
  );

  const domainAddedLogs: Array<ColonyEventLog> = await getDomainAddedLogs(
    colonyClient
  );

  const colonyInitialisedLogs: Array<ColonyEventLog> =
    await getColonyInitialisedLogs(colonyClient);

  const allEventLogs: Array<ColonyEventLog> = [
    ...colonyRoleSetLogs,
    ...payoutClaimedLogs,
    ...domainAddedLogs,
    ...colonyInitialisedLogs
  ];
  const sortedLogs = allEventLogs.sort(
    (a: ColonyEventLog, b: ColonyEventLog) => b.logTime! - a.logTime!
  );
  return sortedLogs;
};

export default getAllLogs;
