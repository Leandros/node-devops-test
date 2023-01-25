export { run } from '@oclif/core';

// Doxy.me Senior DevOps Coding Challenge:
//
// You're looking at a TypeScript CLI application to interact with AWS.
//
// It's using https://oclif.io to parse and process command line arguments.
// Furthermore, the application depends on the AWS JavaScript SDK. For any
// further dependencies check the `package.json`.
//
//
// Task:
//
// Your task is to add a new sub-command called 'upload'. This command must
// take a single parameter, the path to a file (e.g., `./bin/run upload <path-to-file>`).
// The file specified must be uploaded to an AWS S3 bucket, using the already
// provided interface in `src/provider/s3.ts`.
// The file must be renamed and uploaded to S3 as `<unixtimestamp>.<original-file-ending>`.
//
// ** Please implement the subcommand and the required tests. **
//
//
// Further information:
//
// The S3 interface has two implementations, the first implementation (`src/provider/impl/s3.ts`)
// is using the aws-sdk, the second implementation (`src/provider/mock/s3.ts`)
// is a mock implementation to be used for testing. It's guaranteed to make
// no network requests.
