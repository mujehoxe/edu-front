export default class Attachment {
  id: number;
  file: {
    id: number;
    originalname: string,
    mimetype: string,
    size: number,
    createdDate: Date,
    destination: string,
    filename: string
  };
  
}

export function getPath(attachment: Attachment) {
  return location.host + '/' + attachment.file.destination + attachment.file.filename;
}