const moment = require('moment');
import { Timestamp } from '@google-cloud/firestore';

export function timestampsToISO(timestamp: Timestamp): string {
    return moment(timestamp.toMillis());
}