import assert from "node:assert/strict";
import test from "node:test";

import { adminsOnly, adminsOrSelf, loggedIn } from "../access.ts";

const accessArgs = (
  user:
    | {
        collection: "users";
        id: string;
        role: "admin" | "editor";
      }
    | {
        collection: "payload-mcp-api-keys";
        id: string;
      }
    | null,
  id?: string,
) =>
  ({
    id,
    req: { user },
  }) as never;

test("admin-only access rejects guests and editors", () => {
  assert.equal(adminsOnly(accessArgs(null)), false);
  assert.equal(
    adminsOnly(
      accessArgs({
        collection: "users",
        id: "editor-1",
        role: "editor",
      }),
    ),
    false,
  );
});

test("admin-only access allows administrators", () => {
  assert.equal(
    adminsOnly(
      accessArgs({ collection: "users", id: "admin-1", role: "admin" }),
    ),
    true,
  );
});

test("editors can access only their own user record", () => {
  const editor = {
    collection: "users",
    id: "editor-1",
    role: "editor",
  } as const;

  assert.equal(adminsOrSelf(accessArgs(editor, "editor-1")), true);
  assert.equal(adminsOrSelf(accessArgs(editor, "editor-2")), false);
  assert.deepEqual(adminsOrSelf(accessArgs(editor)), {
    id: { equals: "editor-1" },
  });
});

test("administrators can access every user record", () => {
  assert.equal(
    adminsOrSelf(
      accessArgs(
        { collection: "users", id: "admin-1", role: "admin" },
        "editor-1",
      ),
    ),
    true,
  );
});

test("MCP API key documents do not count as CMS users", () => {
  const apiKey = {
    collection: "payload-mcp-api-keys",
    id: "mcp-key-1",
  } as const;

  assert.equal(adminsOnly(accessArgs(apiKey)), false);
  assert.equal(adminsOrSelf(accessArgs(apiKey, "mcp-key-1")), false);
  assert.equal(loggedIn(accessArgs(apiKey)), false);
});
