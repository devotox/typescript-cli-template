import { describe, it, expect } from 'vitest';

import { exampleFunction } from '@/index';

describe('exampleFunction', () => {
  it('should return a greeting with the input', () => {
    const result1: string = exampleFunction('world');
    expect(result1).toBe('Hello, world!');

    const result2: string = exampleFunction('TypeScript');
    expect(result2).toBe('Hello, TypeScript!');
  });

  it('should handle empty input', () => {
    const result: string = exampleFunction('');
    expect(result).toBe('Hello, !');
  });
});
