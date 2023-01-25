import type {
  DeleteObjectCommandInput,
  DeleteObjectCommandOutput,
  GetObjectCommandInput,
  GetObjectCommandOutput,
  PutObjectCommandInput,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3';

export interface ISimpleStorageService {
  /**
   * @param input - Arguments for the `GET OBJECT` call.
   * @see The following properties are required:
   *    - `Bucket` - The ARN of the bucket
   *    - `Key` - The key of the object to upload.
   *    - `Body` - The contents of the file.
   */
  putObject: (input: PutObjectCommandInput) => Promise<PutObjectCommandOutput>;

  /**
   * @param input - Arguments for the `GET OBJECT` call.
   * @see The following properties are required:
   *    - `Bucket` - The ARN of the bucket
   *    - `Key` - The key of the object to retrieve.
   */
  getObject: (input: GetObjectCommandInput) => Promise<GetObjectCommandOutput>;

  /**
   * @param input - Arguments for the `DELETE OBJECT` call.
   * @see The following properties are required:
   *    - `Bucket` - The ARN of the bucket
   *    - `Key` - The key of the object to delete.
   */
  deleteObject: (
    input: DeleteObjectCommandInput,
  ) => Promise<DeleteObjectCommandOutput>;
}
