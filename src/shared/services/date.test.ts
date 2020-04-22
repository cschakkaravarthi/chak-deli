import { formatDate } from './date';

describe('formatDate', () => {
  it('formats a date', () => {
    const formatted = formatDate(702086400);
    expect(formatted).toBe('April 1, 1992');
  });
});
