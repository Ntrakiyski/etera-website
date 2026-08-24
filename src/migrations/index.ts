import * as migration_20260824_143240 from './20260824_143240';

export const migrations = [
  {
    up: migration_20260824_143240.up,
    down: migration_20260824_143240.down,
    name: '20260824_143240'
  },
];
