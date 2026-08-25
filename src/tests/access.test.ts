import assert from "node:assert/strict";
import test from "node:test";

import { adminsOnly, adminsOrSelf } from "../access.ts";

const accessArgs = (
  user: { id: string; role: "admin" | "editor" } | null,
  id?: string,
) =>
  ({
    id,
    req: { user },
  }) as never;

test("admin-only access rejects guests and editors", () => {
  assert.equal(adminsOnly(accessArgs(null)), false);
  assert.equal(
    adminsOnly(accessArgs({ id: "editor-1", role: "editor" })),
    false,
  );
});

test("admin-only access allows administrators", () => {
  assert.equal(adminsOnly(accessArgs({ id: "admin-1", role: "admin" })), true);
});

test("editors can access only their own user record", () => {
  const editor = { id: "editor-1", role: "editor" } as const;

  assert.equal(adminsOrSelf(accessArgs(editor, "editor-1")), true);
  assert.equal(adminsOrSelf(accessArgs(editor, "editor-2")), false);
  assert.deepEqual(adminsOrSelf(accessArgs(editor)), {
    id: { equals: "editor-1" },
  });
});

test("administrators can access every user record", () => {
  assert.equal(
    adminsOrSelf(accessArgs({ id: "admin-1", role: "admin" }, "editor-1")),
    true,
  );
});
