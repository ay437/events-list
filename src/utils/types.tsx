import { LogDescription } from 'ethers/utils';

export interface ColonyEventLog extends LogDescription {
  readonly logTime: number;
  readonly address?: string;
  readonly userAddress?: string;
  readonly payoutAmount?: string;
  readonly humanReadableFundingPotId?: string;
  readonly formattedDomainId?: string;
  readonly formattedRoleName?: string;
  readonly formattedTokenType?: string;
}
