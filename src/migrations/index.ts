import * as migration_20260824_143240 from './20260824_143240';
import * as migration_20260825_101707_resolve_review_findings from './20260825_101707_resolve_review_findings';
import * as migration_20260902_081859_add_atelier_team_members from './20260902_081859_add_atelier_team_members';
import * as migration_20260902_083601_add_atelier_team_portraits from './20260902_083601_add_atelier_team_portraits';
import * as migration_20260902_110929_add_payload_mcp_api_keys from './20260902_110929_add_payload_mcp_api_keys';

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
    name: '20260902_083601_add_atelier_team_portraits',
  },
  {
    up: migration_20260902_110929_add_payload_mcp_api_keys.up,
    down: migration_20260902_110929_add_payload_mcp_api_keys.down,
    name: '20260902_110929_add_payload_mcp_api_keys'
  },
];
