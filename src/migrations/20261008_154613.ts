import { MigrateUpArgs, sql } from "@payloadcms/db-d1-sqlite";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`contact_page\` ADD \`inquiry_labels_verification_error\` text;`);
  await db.run(sql`ALTER TABLE \`contact_page\` ADD \`inquiry_labels_sending\` text;`);
  await db.run(sql`ALTER TABLE \`contact_page\` ADD \`inquiry_labels_send_error\` text;`);
  await db.run(sql`ALTER TABLE \`contact_page\` ADD \`inquiry_labels_rate_limit_error\` text;`);
  await db.run(sql`ALTER TABLE \`_contact_page_v\` ADD \`version_inquiry_labels_verification_error\` text;`);
  await db.run(sql`ALTER TABLE \`_contact_page_v\` ADD \`version_inquiry_labels_sending\` text;`);
  await db.run(sql`ALTER TABLE \`_contact_page_v\` ADD \`version_inquiry_labels_send_error\` text;`);
  await db.run(sql`ALTER TABLE \`_contact_page_v\` ADD \`version_inquiry_labels_rate_limit_error\` text;`);
}

export async function down(): Promise<void> {
  throw new Error("Retain enquiry copy when rolling back application code.");
}
