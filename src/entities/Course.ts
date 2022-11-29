import Thumbnail from './Thumbnail';

export default class Course {
  id: number;
  title: string;
  description?: string;
  category?: string;
  level?: string;
  speciality?: string;
  thumbnail?: Thumbnail;
  topics?: any;
}
