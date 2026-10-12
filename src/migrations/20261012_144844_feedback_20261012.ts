import { MigrateUpArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`atelier_page_method_steps\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`_atelier_page_v_version_method_steps\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`contact_page\` ADD \`inquiry_labels_industry\` text DEFAULT 'Industry (Optional)';`)
  await db.run(sql`ALTER TABLE \`_contact_page_v\` ADD \`version_inquiry_labels_industry\` text DEFAULT 'Industry (Optional)';`)
}

export async function down(): Promise<void> {
  throw new Error('Forward-only migration: preserve published Method and form copy. Restore the reviewed database snapshot if a rollback is required.');
}
