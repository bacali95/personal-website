import {Image} from "./Image";

export class Project {
  _id: String;
  title: String;
  description: String;
  type: String;
  category: String;
  period: {
    start: String,
    finish: String
  };
  repoGithub: String;
  creationDate: Date;
  images: Image[];
}

