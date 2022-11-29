export default class Thumbnail{
  destination: string;
  filename: string;
  originalname: string;

}

export function getThumbnailSource(thumbnail: Thumbnail): string {
  return '/' + thumbnail.destination + thumbnail.filename;
}
