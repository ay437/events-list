import { ColonyClient } from '@colony/colony-js';
import { getLogs, getBlockTime } from '@colony/colony-js';
import { utils, EventFilter } from 'ethers';
import { ColonyEventLog } from '../utils/types';
import { BigNumber, LogDescription } from 'ethers/utils';
import { Log } from 'ethers/providers/abstract-provider';

const tokenType: { [key: string]: string } = {
  '0x0dd7b8f3d1fa88FAbAa8a04A0c7B52FC35D4312c': 'βLNY',
  '0x6B175474E89094C44Da98b954EedeAC495271d0F': 'DAI'
};

const getPayoutClaimedLogs = async (colonyClient: ColonyClient) => {
  const eventFilter: EventFilter = colonyClient.filters.PayoutClaimed(
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

      const humanReadableAmount = new utils.BigNumber(eventLog.values.amount);

      const wei = new utils.BigNumber(10);

      const payoutAmount = humanReadableAmount.div(wei.pow(18)).toString();

      const humanReadableFundingPotId = new BigNumber(
        eventLog.values.fundingPotId
      ).toString();

      const { associatedTypeId } = await colonyClient.getFundingPot(
        humanReadableFundingPotId
      );

      const { recipient: userAddress } = await colonyClient.getPayment(
        associatedTypeId
      );

      const formattedTokenType = tokenType[eventLog.values.token];

      return {
        ...eventLog,
        logTime,
        payoutAmount,
        humanReadableFundingPotId,
        userAddress,
        formattedTokenType
      };
    })
  );
  return formattedLogs;
};

export default getPayoutClaimedLogs;
