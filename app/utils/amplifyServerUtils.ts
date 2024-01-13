import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import config from '../../src/amplifyconfiguration.json'

export const { runWithAmplifyServerContext } = createServerRunner({
  config
});