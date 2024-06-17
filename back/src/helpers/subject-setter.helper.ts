import { SUBJECT_MESSAGE } from 'src/utils/constants';

const subjectSetter = (subject: string): SUBJECT_MESSAGE => {
  let subjectMessage: SUBJECT_MESSAGE;
  switch (subject) {
    case SUBJECT_MESSAGE.COMPLAINT:
      subjectMessage = SUBJECT_MESSAGE.COMPLAINT;
      break;
    case SUBJECT_MESSAGE.INQUIRY:
      subjectMessage = SUBJECT_MESSAGE.INQUIRY;
      break;
    case SUBJECT_MESSAGE.SUGGESTION:
      subjectMessage = SUBJECT_MESSAGE.SUGGESTION;
      break;
    case SUBJECT_MESSAGE.MAINTENANCE_REQUEST:
      subjectMessage = SUBJECT_MESSAGE.MAINTENANCE_REQUEST;
      break;
  }

  return subjectMessage;
};

export default subjectSetter;
