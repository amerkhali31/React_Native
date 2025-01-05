// src/realm/announcementSchema.ts
import { ObjectSchema } from 'realm';
import Realm, { BSON } from 'realm';

export const AnnouncementSchema: ObjectSchema = {
  name: 'Announcement',  // like AnnouncementEntity
  properties: {
    _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId() },
    url: 'string?',
  },
  primaryKey: '_id',
};
