import styles from '../styles.module.css';
import { ColonyEventLog } from '../utils/types';

const EventMessage = ({ eventLog }: { eventLog: ColonyEventLog }) => {
  const {
    name,
    userAddress,
    payoutAmount,
    humanReadableFundingPotId,
    formattedDomainId,
    formattedRoleName,
    formattedTokenType,
    values: { user, setTo }
  } = eventLog;

  switch (name) {
    case 'ColonyInitialised':
      return (
        <p className={styles.eventMessage}>
          Congratulations! It's a beautiful baby colony!
        </p>
      );
    case 'ColonyRoleSet':
      return (
        <p className={styles.eventMessage}>
          <span>{formattedRoleName}</span> role
          {setTo ? ' assigned to ' : ' revoked from '}user <span>{user}</span>{' '}
          in domain <span>{formattedDomainId}</span>
        </p>
      );
    case 'PayoutClaimed':
      return (
        <p className={styles.eventMessage}>
          User <span>{userAddress}</span> claimed{' '}
          <span>
            {payoutAmount}
            {formattedTokenType}
          </span>{' '}
          payout from pot <span>{humanReadableFundingPotId}</span>
        </p>
      );
    case 'DomainAdded':
      return (
        <p className={styles.eventMessage}>
          Domain <span>{formattedDomainId}</span> added
        </p>
      );
    default:
      console.log('Event log not found');
      return null;
  }
};

export default EventMessage;
