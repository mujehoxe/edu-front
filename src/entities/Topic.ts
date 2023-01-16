import Attachment from './Attachment';

export default class Topic {
  id: number;
  title: string;
  description?: string;
  category?: string;
  level?: string;
  speciality?: string;
  attachments?: Attachment[];
}
