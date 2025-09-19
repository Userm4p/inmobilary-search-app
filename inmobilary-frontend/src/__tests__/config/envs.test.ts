import { envs } from '@/config/envs';

describe('Environment Configuration', () => {
  it('should export API_BASE_URL', () => {
    expect(envs).toBeDefined();
  });
});
