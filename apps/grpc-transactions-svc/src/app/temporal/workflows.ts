import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { _processBatch } = proxyActivities<typeof activities>({
	startToCloseTimeout: '1 minute',
});

export async function processBatch(batchId: string): Promise<string> {
  return await _processBatch(batchId);
}
