import { Args, Command, Flags } from '@oclif/core';
import * as ora from 'ora';

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default class Deploy extends Command {
  static override description = 'Deploy any project';

  static override examples = [
    `$ cli deploy --to=staging frontend`,
  ];

  static override flags = {
    to: Flags.string({
      description: 'Which environment to deploy to',
      required: true,
      options: ['dev', 'staging', 'prod'],
    }),
  };

  static override args = {
    project: Args.string({
      description: 'The project to deploy',
      required: true,
      options: ['frontend', 'backend'],
    }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Deploy);

    const spinner = ora({
      spinner: 'bouncingBar',
      text: `deploying ${args.project}`,
    }).start();

    await sleep(2000);

    spinner.succeed(`successfully deployed ${args.project} to ${flags.to}!`);
  }
}
