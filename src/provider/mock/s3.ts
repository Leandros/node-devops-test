import {
  type PutObjectCommandInput,
  type PutObjectCommandOutput,
  type GetObjectCommandInput,
  type GetObjectCommandOutput,
  type DeleteObjectCommandInput,
  type DeleteObjectCommandOutput,
} from '@aws-sdk/client-s3';
import type { ISimpleStorageService } from '../s3';

type File = Blob | undefined;
type FileList = Record<string, File>;

/**
 * @class S3
 * @description The *MOCK* implementation to use AWS S3.
 */
export class S3 implements ISimpleStorageService {
  buckets: Record<string, FileList> = {};

  async putObject(
    input: PutObjectCommandInput,
  ): Promise<PutObjectCommandOutput> {
    /*
     * Despite `Bucket` being required, it still might be `undefined`.
     * This feels like a bug in the SDK.
     */
    const bucketArn = input.Bucket;
    if (bucketArn === undefined) {
      throw new Error('bucket undefined. please specify bucket arn.');
    }
    const key = input.Key;
    if (key === undefined) {
      throw new Error('key undefined. please specify key.');
    }

    /* Grab the current bucket. */
    const bucket = this.getBucket(bucketArn);

    /* Insert the file into the bucket. */
    if (!(input.Body instanceof Blob)) {
      throw new TypeError('input.Body must be a Blob');
    }

    bucket[key] = input.Body;

    /* We return a blanket 200 OK. */
    return {
      $metadata: {
        httpStatusCode: 200,
      },
    };
  }

  async getObject(
    input: GetObjectCommandInput,
  ): Promise<GetObjectCommandOutput> {
    const bucketArn = input.Bucket;
    if (bucketArn === undefined) {
      throw new Error('bucket undefined. please specify bucket arn.');
    }
    const key = input.Key;
    if (key === undefined) {
      throw new Error('key undefined. please specify key.');
    }

    const bucket = this.getBucket(bucketArn);
    const file = bucket[key];
    if (file === undefined) {
      return {
        $metadata: {
          httpStatusCode: 404,
        },
      };
    }

    return {
      $metadata: {
        httpStatusCode: 200,
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Body: {
        ...file,
        transformToByteArray: async (): Promise<Uint8Array> => {
          throw new Error('not implemented');
        },
        transformToString: async (_encoding?: string): Promise<string> => {
          throw new Error('not implemented');
        },
        transformToWebStream: (): ReadableStream => {
          throw new Error('not implemented');
        },
      },
    };
  }

  async deleteObject(
    input: DeleteObjectCommandInput,
  ): Promise<DeleteObjectCommandOutput> {
    const bucketArn = input.Bucket;
    if (bucketArn === undefined) {
      throw new Error('bucket undefined. please specify bucket arn.');
    }
    const key = input.Key;
    if (key === undefined) {
      throw new Error('key undefined. please specify key.');
    }

    const bucket = this.getBucket(bucketArn);
    bucket[key] = undefined;

    return {
      $metadata: {
        httpStatusCode: 200,
      },
    };
  }

  private getBucket(arn: string): FileList {
    if (this.buckets[arn] === undefined) {
      this.buckets[arn] = {};
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.buckets[arn]!;
  }
}
