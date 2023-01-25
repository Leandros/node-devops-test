import {
  type PutObjectCommandInput,
  type PutObjectCommandOutput,
  type GetObjectCommandInput,
  type GetObjectCommandOutput,
  type DeleteObjectCommandInput,
  type DeleteObjectCommandOutput,
  type S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import type { ISimpleStorageService } from '../s3';

/**
 * @class S3
 * @description The real implementation to use AWS S3.
 */
export class S3 implements ISimpleStorageService {
  private readonly client: S3Client;

  constructor(client: S3Client) {
    this.client = client;
  }

  async putObject(
    input: PutObjectCommandInput,
  ): Promise<PutObjectCommandOutput> {
    return this.client.send(new PutObjectCommand(input));
  }

  async getObject(
    input: GetObjectCommandInput,
  ): Promise<GetObjectCommandOutput> {
    return this.client.send(new GetObjectCommand(input));
  }

  async deleteObject(
    input: DeleteObjectCommandInput,
  ): Promise<DeleteObjectCommandOutput> {
    return this.client.send(new DeleteObjectCommand(input));
  }
}
