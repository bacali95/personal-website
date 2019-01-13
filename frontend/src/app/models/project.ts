export class Project {
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
  images: Object[];
}
