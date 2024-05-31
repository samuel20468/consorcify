import { SAT } from 'src/utils/constants';

const satSetter = (sat: string): SAT => {
  let satCAdmin: SAT;
  switch (sat) {
    case SAT.MONOTAX:
      satCAdmin = SAT.MONOTAX;
      break;
    case SAT.REGISTERED_RESPONSIBLE:
      satCAdmin = SAT.REGISTERED_RESPONSIBLE;
      break;
    case SAT.NON_REGISTERED_RESPONSIBLE:
      satCAdmin = SAT.NON_REGISTERED_RESPONSIBLE;
      break;
    case SAT.EXEMPT:
      satCAdmin = SAT.EXEMPT;
      break;
  }

  return satCAdmin;
};

export default satSetter;
