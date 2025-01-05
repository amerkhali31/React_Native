// app/realm/AnnouncementSchema.ts
import { ObjectSchema } from 'realm';
import { BSON } from 'realm';

export const AnnouncementSchema: ObjectSchema = {
  name: 'Announcement',
  primaryKey: '_id',
  properties: {
    _id: { type: 'objectId', default: () => new BSON.ObjectId() },
    url: 'string?',
  },
};