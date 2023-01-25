import { expect, test } from '@oclif/test';

describe('deploy', () => {
  test
    .stderr()
    .command(['deploy', 'frontend', '--to=dev'])
    .it("runs 'deploy' cmd", (ctx) => {
      expect(ctx.stderr).to.contain('deploying');
    });
});
