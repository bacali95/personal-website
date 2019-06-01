export class Image {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  type: string;
  url: string;
  secure_url: string;
}
export class LocalImage {
  public_id: string;
  secure_url: string | ArrayBuffer;
  format: string;
  progress: number = 0;
  payload: any;
}
