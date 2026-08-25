import * as migration_20260824_143240 from "./20260824_143240";
import * as migration_20260825_101707_resolve_review_findings from "./20260825_101707_resolve_review_findings";

export const migrations = [
  {
    up: migration_20260824_143240.up,
    down: migration_20260824_143240.down,
    name: "20260824_143240",
  },
  {
    up: migration_20260825_101707_resolve_review_findings.up,
    down: migration_20260825_101707_resolve_review_findings.down,
    name: "20260825_101707_resolve_review_findings",
  },
];
