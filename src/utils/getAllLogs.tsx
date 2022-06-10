import connectColonyClient from './connectColonyClient';
import getColonyInitialisedLogs from './getColonyInitialisedLogs';
import getColonyRoleSetLogs from './getColonyRoleSetLogs';
import getDomainAddedLogs from './getDomainAddedLogs';
import getPayoutClaimedLogs from './getPayoutClaimedLogs';
import { LogDescription } from 'ethers/utils';

export interface ColonyEventLog extends LogDescription {
  sort: any;
  readonly logTime: number;
  readonly address?: string;
  readonly userAddress?: string;
  readonly payoutClaimed?: string;
  readonly humanReadableFundingPotId?: string;
}

const getAllLogs = async () => {
  const colonyClient = await connectColonyClient();

  const colonyInitialisedLogs = await getColonyInitialisedLogs(colonyClient);

  const colonyRoleSetLogs = await getColonyRoleSetLogs(colonyClient);

  const domainAddedLogs = await getDomainAddedLogs(colonyClient);

  const payoutClaimedLogs = await getPayoutClaimedLogs(colonyClient);

  const allEventLogs: ColonyEventLog = [
    ...colonyInitialisedLogs,
    ...colonyRoleSetLogs,
    ...domainAddedLogs,
    ...payoutClaimedLogs
  ];
  const sortedEvents = allEventLogs.sort((a, b) => b.logTime - a.logTime);
  return sortedEvents;
};

export default getAllLogs;
