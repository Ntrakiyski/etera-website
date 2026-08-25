import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-d1-sqlite";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`status\`;`);
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`featured\`;`);
  await db.run(
    sql`ALTER TABLE \`_projects_v\` DROP COLUMN \`version_status\`;`,
  );
  await db.run(
    sql`ALTER TABLE \`_projects_v\` DROP COLUMN \`version_featured\`;`,
  );
  await db.run(sql`ALTER TABLE \`people\` DROP COLUMN \`featured\`;`);
  await db.run(sql`ALTER TABLE \`partners\` DROP COLUMN \`featured\`;`);
  await db.run(
    sql`ALTER TABLE \`contact_page\` DROP COLUMN \`success_message\`;`,
  );
  await db.run(
    sql`ALTER TABLE \`_contact_page_v\` DROP COLUMN \`version_success_message\`;`,
  );
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(
    sql`ALTER TABLE \`projects\` ADD \`status\` text DEFAULT 'draft';`,
  );
  await db.run(
    sql`ALTER TABLE \`projects\` ADD \`featured\` integer DEFAULT false;`,
  );
  await db.run(
    sql`ALTER TABLE \`_projects_v\` ADD \`version_status\` text DEFAULT 'draft';`,
  );
  await db.run(
    sql`ALTER TABLE \`_projects_v\` ADD \`version_featured\` integer DEFAULT false;`,
  );
  await db.run(
    sql`ALTER TABLE \`people\` ADD \`featured\` integer DEFAULT true;`,
  );
  await db.run(
    sql`ALTER TABLE \`partners\` ADD \`featured\` integer DEFAULT true;`,
  );
  await db.run(
    sql`ALTER TABLE \`contact_page\` ADD \`success_message\` text DEFAULT 'Thank you. We''ve received your inquiry and will get back to you once we''ve reviewed the project details.';`,
  );
  await db.run(
    sql`ALTER TABLE \`_contact_page_v\` ADD \`version_success_message\` text DEFAULT 'Thank you. We''ve received your inquiry and will get back to you once we''ve reviewed the project details.';`,
  );
}
