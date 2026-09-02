import * as migration_20260824_143240 from './20260824_143240';
import * as migration_20260825_101707_resolve_review_findings from './20260825_101707_resolve_review_findings';
import * as migration_20260902_081859_add_atelier_team_members from './20260902_081859_add_atelier_team_members';
import * as migration_20260902_083601_add_atelier_team_portraits from './20260902_083601_add_atelier_team_portraits';

export const migrations = [
  {
    up: migration_20260824_143240.up,
    down: migration_20260824_143240.down,
    name: '20260824_143240',
  },
  {
    up: migration_20260825_101707_resolve_review_findings.up,
    down: migration_20260825_101707_resolve_review_findings.down,
    name: '20260825_101707_resolve_review_findings',
  },
  {
    up: migration_20260902_081859_add_atelier_team_members.up,
    down: migration_20260902_081859_add_atelier_team_members.down,
    name: '20260902_081859_add_atelier_team_members',
  },
  {
    up: migration_20260902_083601_add_atelier_team_portraits.up,
    down: migration_20260902_083601_add_atelier_team_portraits.down,
    name: '20260902_083601_add_atelier_team_portraits'
  },
];
