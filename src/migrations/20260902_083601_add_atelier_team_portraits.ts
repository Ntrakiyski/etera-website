import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_site_settings\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`contact_email\` text DEFAULT 'hello@eteracreative.com' NOT NULL,
  	\`booking_u_r_l\` text DEFAULT 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1cN59tKh527V9JQcQH9yd31V3Z0VRf9Ue3MMUZ58UwPWM-gVdLhEacKQurbpdEbFh-pLZv07sm?gv=true',
  	\`footer_tagline\` text DEFAULT 'Define your era.' NOT NULL,
  	\`seo_title\` text DEFAULT 'ETÉRA Creative Atelier' NOT NULL,
  	\`seo_description\` text DEFAULT 'ETÉRA is a creative atelier that builds presence and shapes culture.' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_settings\`("id", "contact_email", "booking_u_r_l", "footer_tagline", "seo_title", "seo_description", "updated_at", "created_at") SELECT "id", "contact_email", "booking_u_r_l", "footer_tagline", "seo_title", "seo_description", "updated_at", "created_at" FROM \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings\` RENAME TO \`site_settings\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`ALTER TABLE \`atelier_page_team_members\` ADD \`portrait_id\` text(36) REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`atelier_page_team_members_portrait_idx\` ON \`atelier_page_team_members\` (\`portrait_id\`);`)
  await db.run(sql`ALTER TABLE \`_atelier_page_v_version_team_members\` ADD \`portrait_id\` text(36) REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_atelier_page_v_version_team_members_portrait_idx\` ON \`_atelier_page_v_version_team_members\` (\`portrait_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_atelier_page_team_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`position\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`atelier_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_atelier_page_team_members\`("_order", "_parent_id", "id", "name", "position", "description") SELECT "_order", "_parent_id", "id", "name", "position", "description" FROM \`atelier_page_team_members\`;`)
  await db.run(sql`DROP TABLE \`atelier_page_team_members\`;`)
  await db.run(sql`ALTER TABLE \`__new_atelier_page_team_members\` RENAME TO \`atelier_page_team_members\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`atelier_page_team_members_order_idx\` ON \`atelier_page_team_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`atelier_page_team_members_parent_id_idx\` ON \`atelier_page_team_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__atelier_page_v_version_team_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`position\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_atelier_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__atelier_page_v_version_team_members\`("_order", "_parent_id", "id", "name", "position", "description", "_uuid") SELECT "_order", "_parent_id", "id", "name", "position", "description", "_uuid" FROM \`_atelier_page_v_version_team_members\`;`)
  await db.run(sql`DROP TABLE \`_atelier_page_v_version_team_members\`;`)
  await db.run(sql`ALTER TABLE \`__new__atelier_page_v_version_team_members\` RENAME TO \`_atelier_page_v_version_team_members\`;`)
  await db.run(sql`CREATE INDEX \`_atelier_page_v_version_team_members_order_idx\` ON \`_atelier_page_v_version_team_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_atelier_page_v_version_team_members_parent_id_idx\` ON \`_atelier_page_v_version_team_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_site_settings\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`contact_email\` text DEFAULT 'hello@eteracreative.com' NOT NULL,
  	\`booking_u_r_l\` text,
  	\`footer_tagline\` text DEFAULT 'Define your era.' NOT NULL,
  	\`seo_title\` text DEFAULT 'ETÉRA Creative Atelier' NOT NULL,
  	\`seo_description\` text DEFAULT 'ETÉRA is a creative atelier that builds presence and shapes culture.' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_settings\`("id", "contact_email", "booking_u_r_l", "footer_tagline", "seo_title", "seo_description", "updated_at", "created_at") SELECT "id", "contact_email", "booking_u_r_l", "footer_tagline", "seo_title", "seo_description", "updated_at", "created_at" FROM \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings\` RENAME TO \`site_settings\`;`)
}
