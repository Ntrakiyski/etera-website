import { MigrateUpArgs, sql } from "@payloadcms/db-d1-sqlite";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`seo_settings\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`site_name\` text DEFAULT 'ETÉRA Creative Atelier',
  	\`default_title\` text,
  	\`default_description\` text,
  	\`title_suffix\` text DEFAULT 'ETÉRA Creative Atelier',
  	\`site_u_r_l\` text,
  	\`sharing_image_id\` text(36),
  	\`site_icon_id\` text(36),
  	\`indexing_enabled\` integer DEFAULT true,
  	\`google_verification\` text,
  	\`twitter_handle\` text,
  	\`home_title\` text,
  	\`home_description\` text,
  	\`home_sharing_title\` text,
  	\`home_sharing_description\` text,
  	\`home_sharing_image_id\` text(36),
  	\`home_canonical_u_r_l\` text,
  	\`home_no_index\` integer DEFAULT false,
  	\`atelier_title\` text,
  	\`atelier_description\` text,
  	\`atelier_sharing_title\` text,
  	\`atelier_sharing_description\` text,
  	\`atelier_sharing_image_id\` text(36),
  	\`atelier_canonical_u_r_l\` text,
  	\`atelier_no_index\` integer DEFAULT false,
  	\`services_title\` text,
  	\`services_description\` text,
  	\`services_sharing_title\` text,
  	\`services_sharing_description\` text,
  	\`services_sharing_image_id\` text(36),
  	\`services_canonical_u_r_l\` text,
  	\`services_no_index\` integer DEFAULT false,
  	\`contact_title\` text,
  	\`contact_description\` text,
  	\`contact_sharing_title\` text,
  	\`contact_sharing_description\` text,
  	\`contact_sharing_image_id\` text(36),
  	\`contact_canonical_u_r_l\` text,
  	\`contact_no_index\` integer DEFAULT false,
  	\`terms_title\` text,
  	\`terms_description\` text,
  	\`terms_sharing_title\` text,
  	\`terms_sharing_description\` text,
  	\`terms_sharing_image_id\` text(36),
  	\`terms_canonical_u_r_l\` text,
  	\`terms_no_index\` integer DEFAULT false,
  	\`privacy_title\` text,
  	\`privacy_description\` text,
  	\`privacy_sharing_title\` text,
  	\`privacy_sharing_description\` text,
  	\`privacy_sharing_image_id\` text(36),
  	\`privacy_canonical_u_r_l\` text,
  	\`privacy_no_index\` integer DEFAULT false,
  	\`cookies_title\` text,
  	\`cookies_description\` text,
  	\`cookies_sharing_title\` text,
  	\`cookies_sharing_description\` text,
  	\`cookies_sharing_image_id\` text(36),
  	\`cookies_canonical_u_r_l\` text,
  	\`cookies_no_index\` integer DEFAULT false,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`sharing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`site_icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`home_sharing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`atelier_sharing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`services_sharing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`contact_sharing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`terms_sharing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`privacy_sharing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cookies_sharing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(sql`CREATE TABLE \`_seo_settings_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`version_site_name\` text DEFAULT 'ETÉRA Creative Atelier',
  	\`version_default_title\` text,
  	\`version_default_description\` text,
  	\`version_title_suffix\` text DEFAULT 'ETÉRA Creative Atelier',
  	\`version_site_u_r_l\` text,
  	\`version_sharing_image_id\` text(36),
  	\`version_site_icon_id\` text(36),
  	\`version_indexing_enabled\` integer DEFAULT true,
  	\`version_google_verification\` text,
  	\`version_twitter_handle\` text,
  	\`version_home_title\` text,
  	\`version_home_description\` text,
  	\`version_home_sharing_title\` text,
  	\`version_home_sharing_description\` text,
  	\`version_home_sharing_image_id\` text(36),
  	\`version_home_canonical_u_r_l\` text,
  	\`version_home_no_index\` integer DEFAULT false,
  	\`version_atelier_title\` text,
  	\`version_atelier_description\` text,
  	\`version_atelier_sharing_title\` text,
  	\`version_atelier_sharing_description\` text,
  	\`version_atelier_sharing_image_id\` text(36),
  	\`version_atelier_canonical_u_r_l\` text,
  	\`version_atelier_no_index\` integer DEFAULT false,
  	\`version_services_title\` text,
  	\`version_services_description\` text,
  	\`version_services_sharing_title\` text,
  	\`version_services_sharing_description\` text,
  	\`version_services_sharing_image_id\` text(36),
  	\`version_services_canonical_u_r_l\` text,
  	\`version_services_no_index\` integer DEFAULT false,
  	\`version_contact_title\` text,
  	\`version_contact_description\` text,
  	\`version_contact_sharing_title\` text,
  	\`version_contact_sharing_description\` text,
  	\`version_contact_sharing_image_id\` text(36),
  	\`version_contact_canonical_u_r_l\` text,
  	\`version_contact_no_index\` integer DEFAULT false,
  	\`version_terms_title\` text,
  	\`version_terms_description\` text,
  	\`version_terms_sharing_title\` text,
  	\`version_terms_sharing_description\` text,
  	\`version_terms_sharing_image_id\` text(36),
  	\`version_terms_canonical_u_r_l\` text,
  	\`version_terms_no_index\` integer DEFAULT false,
  	\`version_privacy_title\` text,
  	\`version_privacy_description\` text,
  	\`version_privacy_sharing_title\` text,
  	\`version_privacy_sharing_description\` text,
  	\`version_privacy_sharing_image_id\` text(36),
  	\`version_privacy_canonical_u_r_l\` text,
  	\`version_privacy_no_index\` integer DEFAULT false,
  	\`version_cookies_title\` text,
  	\`version_cookies_description\` text,
  	\`version_cookies_sharing_title\` text,
  	\`version_cookies_sharing_description\` text,
  	\`version_cookies_sharing_image_id\` text(36),
  	\`version_cookies_canonical_u_r_l\` text,
  	\`version_cookies_no_index\` integer DEFAULT false,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`version_sharing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_site_icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_home_sharing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_atelier_sharing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_services_sharing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_contact_sharing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_terms_sharing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_privacy_sharing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_cookies_sharing_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `);
  await db.run(sql`CREATE INDEX \`seo_settings_sharing_image_idx\` ON \`seo_settings\` (\`sharing_image_id\`);`);
  await db.run(sql`CREATE INDEX \`seo_settings_site_icon_idx\` ON \`seo_settings\` (\`site_icon_id\`);`);
  await db.run(sql`CREATE INDEX \`seo_settings_home_home_sharing_image_idx\` ON \`seo_settings\` (\`home_sharing_image_id\`);`);
  await db.run(sql`CREATE INDEX \`seo_settings_atelier_atelier_sharing_image_idx\` ON \`seo_settings\` (\`atelier_sharing_image_id\`);`);
  await db.run(sql`CREATE INDEX \`seo_settings_services_services_sharing_image_idx\` ON \`seo_settings\` (\`services_sharing_image_id\`);`);
  await db.run(sql`CREATE INDEX \`seo_settings_contact_contact_sharing_image_idx\` ON \`seo_settings\` (\`contact_sharing_image_id\`);`);
  await db.run(sql`CREATE INDEX \`seo_settings_terms_terms_sharing_image_idx\` ON \`seo_settings\` (\`terms_sharing_image_id\`);`);
  await db.run(sql`CREATE INDEX \`seo_settings_privacy_privacy_sharing_image_idx\` ON \`seo_settings\` (\`privacy_sharing_image_id\`);`);
  await db.run(sql`CREATE INDEX \`seo_settings_cookies_cookies_sharing_image_idx\` ON \`seo_settings\` (\`cookies_sharing_image_id\`);`);
  await db.run(sql`CREATE INDEX \`seo_settings__status_idx\` ON \`seo_settings\` (\`_status\`);`);
  await db.run(sql`CREATE INDEX \`_seo_settings_v_version_version_sharing_image_idx\` ON \`_seo_settings_v\` (\`version_sharing_image_id\`);`);
  await db.run(sql`CREATE INDEX \`_seo_settings_v_version_version_site_icon_idx\` ON \`_seo_settings_v\` (\`version_site_icon_id\`);`);
  await db.run(sql`CREATE INDEX \`_seo_settings_v_version_home_version_home_sharing_image_idx\` ON \`_seo_settings_v\` (\`version_home_sharing_image_id\`);`);
  await db.run(sql`CREATE INDEX \`_seo_settings_v_version_atelier_version_atelier_sharing__idx\` ON \`_seo_settings_v\` (\`version_atelier_sharing_image_id\`);`);
  await db.run(sql`CREATE INDEX \`_seo_settings_v_version_services_version_services_sharin_idx\` ON \`_seo_settings_v\` (\`version_services_sharing_image_id\`);`);
  await db.run(sql`CREATE INDEX \`_seo_settings_v_version_contact_version_contact_sharing__idx\` ON \`_seo_settings_v\` (\`version_contact_sharing_image_id\`);`);
  await db.run(sql`CREATE INDEX \`_seo_settings_v_version_terms_version_terms_sharing_imag_idx\` ON \`_seo_settings_v\` (\`version_terms_sharing_image_id\`);`);
  await db.run(sql`CREATE INDEX \`_seo_settings_v_version_privacy_version_privacy_sharing__idx\` ON \`_seo_settings_v\` (\`version_privacy_sharing_image_id\`);`);
  await db.run(sql`CREATE INDEX \`_seo_settings_v_version_cookies_version_cookies_sharing__idx\` ON \`_seo_settings_v\` (\`version_cookies_sharing_image_id\`);`);
  await db.run(sql`CREATE INDEX \`_seo_settings_v_version_version__status_idx\` ON \`_seo_settings_v\` (\`version__status\`);`);
  await db.run(sql`CREATE INDEX \`_seo_settings_v_created_at_idx\` ON \`_seo_settings_v\` (\`created_at\`);`);
  await db.run(sql`CREATE INDEX \`_seo_settings_v_updated_at_idx\` ON \`_seo_settings_v\` (\`updated_at\`);`);
  await db.run(sql`CREATE INDEX \`_seo_settings_v_latest_idx\` ON \`_seo_settings_v\` (\`latest\`);`);
}

export async function down(): Promise<void> {
  throw new Error("Retain CMS content tables when reverting the application; removing them would discard editor content.");
}
