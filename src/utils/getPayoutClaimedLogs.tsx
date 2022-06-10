import connectColonyClient from './connectColonyClient';
import { getLogs, getBlockTime } from '@colony/colony-js';
import { utils } from 'ethers';
import { BigNumber } from 'ethers/utils';

const getPayoutClaimedLogs = async () => {
  const colonyClient = await connectColonyClient(); // pass as prop to do only once

  const eventFilter = colonyClient.filters.PayoutClaimed(null, null, null);

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

      const humanReadableAmount = new utils.BigNumber(eventLog.values.amount);

      const wei = new utils.BigNumber(10);

      const payoutAmount = humanReadableAmount.div(wei.pow(18));

      const humanReadableFundingPotId = new BigNumber(
        eventLog.values.fundingPotId
      ).toString();

      const { associatedTypeId } = await colonyClient.getFundingPot(
        humanReadableFundingPotId
      );

      const { recipient: userAddress } = await colonyClient.getPayment(
        associatedTypeId
      );

      return {
        ...eventLog,
        logTime,
        payoutAmount,
        humanReadableFundingPotId,
        userAddress
      };
    })
  );
  return formattedLogs;
};

export default getPayoutClaimedLogs;
