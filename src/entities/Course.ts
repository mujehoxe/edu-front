import Thumbnail from './Thumbnail';
import Topic from './Topic';

export default class Course {
  id: number;
  title: string;
  description?: string;
  category?: string;
  level?: string;
  speciality?: string;
  thumbnail?: Thumbnail;
  topics?: Array<Topic>;
}
