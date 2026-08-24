import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`role\` text DEFAULT 'admin' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`services\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`area\` text,
  	\`summary\` text,
  	\`details\` text,
  	\`featured\` integer DEFAULT true,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`services__status_idx\` ON \`services\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_services_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_name\` text,
  	\`version_area\` text,
  	\`version_summary\` text,
  	\`version_details\` text,
  	\`version_featured\` integer DEFAULT true,
  	\`version_sort_order\` numeric DEFAULT 0,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_parent_idx\` ON \`_services_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_updated_at_idx\` ON \`_services_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_created_at_idx\` ON \`_services_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version__status_idx\` ON \`_services_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_created_at_idx\` ON \`_services_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_updated_at_idx\` ON \`_services_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_latest_idx\` ON \`_services_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`projects_results\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_results_order_idx\` ON \`projects_results\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_results_parent_id_idx\` ON \`projects_results\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`asset_id\` text(36),
  	\`caption\` text,
  	FOREIGN KEY (\`asset_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_gallery_order_idx\` ON \`projects_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_gallery_parent_id_idx\` ON \`projects_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_gallery_asset_idx\` ON \`projects_gallery\` (\`asset_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_collaborators\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`role\` text,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_collaborators_order_idx\` ON \`projects_collaborators\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_collaborators_parent_id_idx\` ON \`projects_collaborators\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`client_name\` text,
  	\`project_name\` text,
  	\`slug\` text,
  	\`status\` text DEFAULT 'draft',
  	\`year\` text,
  	\`featured\` integer DEFAULT false,
  	\`sort_order\` numeric DEFAULT 0,
  	\`hero_image_id\` text(36),
  	\`overview\` text,
  	\`context\` text,
  	\`approach\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_slug_idx\` ON \`projects\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`projects_hero_image_idx\` ON \`projects\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_updated_at_idx\` ON \`projects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`projects_created_at_idx\` ON \`projects\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`projects__status_idx\` ON \`projects\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`projects_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_rels_order_idx\` ON \`projects_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_parent_idx\` ON \`projects_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_path_idx\` ON \`projects_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_services_id_idx\` ON \`projects_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_version_results\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_version_results_order_idx\` ON \`_projects_v_version_results\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_results_parent_id_idx\` ON \`_projects_v_version_results\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_version_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`asset_id\` text(36),
  	\`caption\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`asset_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_version_gallery_order_idx\` ON \`_projects_v_version_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_gallery_parent_id_idx\` ON \`_projects_v_version_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_gallery_asset_idx\` ON \`_projects_v_version_gallery\` (\`asset_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_version_collaborators\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`role\` text,
  	\`name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_version_collaborators_order_idx\` ON \`_projects_v_version_collaborators\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_collaborators_parent_id_idx\` ON \`_projects_v_version_collaborators\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_client_name\` text,
  	\`version_project_name\` text,
  	\`version_slug\` text,
  	\`version_status\` text DEFAULT 'draft',
  	\`version_year\` text,
  	\`version_featured\` integer DEFAULT false,
  	\`version_sort_order\` numeric DEFAULT 0,
  	\`version_hero_image_id\` text(36),
  	\`version_overview\` text,
  	\`version_context\` text,
  	\`version_approach\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_parent_idx\` ON \`_projects_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_slug_idx\` ON \`_projects_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_hero_image_idx\` ON \`_projects_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_updated_at_idx\` ON \`_projects_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_created_at_idx\` ON \`_projects_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version__status_idx\` ON \`_projects_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_created_at_idx\` ON \`_projects_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_updated_at_idx\` ON \`_projects_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_latest_idx\` ON \`_projects_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_rels_order_idx\` ON \`_projects_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_rels_parent_idx\` ON \`_projects_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_rels_path_idx\` ON \`_projects_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_rels_services_id_idx\` ON \`_projects_v_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE TABLE \`people\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text NOT NULL,
  	\`bio\` text,
  	\`portrait_id\` text(36),
  	\`featured\` integer DEFAULT true,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`portrait_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`people_portrait_idx\` ON \`people\` (\`portrait_id\`);`)
  await db.run(sql`CREATE INDEX \`people_updated_at_idx\` ON \`people\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`people_created_at_idx\` ON \`people\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`partners\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`logo_id\` text(36),
  	\`summary\` text,
  	\`url\` text,
  	\`featured\` integer DEFAULT true,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`partners_logo_idx\` ON \`partners\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`partners_updated_at_idx\` ON \`partners\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`partners_created_at_idx\` ON \`partners\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	\`media_id\` text(36),
  	\`services_id\` text(36),
  	\`projects_id\` text(36),
  	\`people_id\` text(36),
  	\`partners_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`people_id\`) REFERENCES \`people\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`partners_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_people_id_idx\` ON \`payload_locked_documents_rels\` (\`people_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_partners_id_idx\` ON \`payload_locked_documents_rels\` (\`partners_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`home_page_method_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_method_steps_order_idx\` ON \`home_page_method_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_method_steps_parent_id_idx\` ON \`home_page_method_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`hero_kicker\` text DEFAULT 'Creative Atelier',
  	\`hero_headline\` text DEFAULT 'Define your era.',
  	\`hero_supporting_copy\` text DEFAULT 'ETÉRA is a creative atelier that builds presence and shapes culture.',
  	\`hero_additional_copy\` text DEFAULT 'Strategy, creativity, cultural context and execution come together across brands, campaigns, content and experiences.',
  	\`hero_c_t_a\` text DEFAULT 'Discover ETÉRA',
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page__status_idx\` ON \`home_page\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`home_page_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`projects_id\` text(36),
  	\`partners_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`partners_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_rels_order_idx\` ON \`home_page_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_parent_idx\` ON \`home_page_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_path_idx\` ON \`home_page_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_projects_id_idx\` ON \`home_page_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`home_page_rels_partners_id_idx\` ON \`home_page_rels\` (\`partners_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_version_method_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_method_steps_order_idx\` ON \`_home_page_v_version_method_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_method_steps_parent_id_idx\` ON \`_home_page_v_version_method_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`version_hero_kicker\` text DEFAULT 'Creative Atelier',
  	\`version_hero_headline\` text DEFAULT 'Define your era.',
  	\`version_hero_supporting_copy\` text DEFAULT 'ETÉRA is a creative atelier that builds presence and shapes culture.',
  	\`version_hero_additional_copy\` text DEFAULT 'Strategy, creativity, cultural context and execution come together across brands, campaigns, content and experiences.',
  	\`version_hero_c_t_a\` text DEFAULT 'Discover ETÉRA',
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_version__status_idx\` ON \`_home_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_created_at_idx\` ON \`_home_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_updated_at_idx\` ON \`_home_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_latest_idx\` ON \`_home_page_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`projects_id\` text(36),
  	\`partners_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_home_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`partners_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_rels_order_idx\` ON \`_home_page_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_rels_parent_idx\` ON \`_home_page_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_rels_path_idx\` ON \`_home_page_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_rels_projects_id_idx\` ON \`_home_page_v_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_rels_partners_id_idx\` ON \`_home_page_v_rels\` (\`partners_id\`);`)
  await db.run(sql`CREATE TABLE \`work_page\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`kicker\` text DEFAULT 'Work',
  	\`headline\` text DEFAULT 'Selected Work',
  	\`intro\` text DEFAULT 'A selection of projects, campaigns, and brand work. Final project content and visuals are pending from ETÉRA.',
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`work_page__status_idx\` ON \`work_page\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_work_page_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`version_kicker\` text DEFAULT 'Work',
  	\`version_headline\` text DEFAULT 'Selected Work',
  	\`version_intro\` text DEFAULT 'A selection of projects, campaigns, and brand work. Final project content and visuals are pending from ETÉRA.',
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_work_page_v_version_version__status_idx\` ON \`_work_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_work_page_v_created_at_idx\` ON \`_work_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_work_page_v_updated_at_idx\` ON \`_work_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_work_page_v_latest_idx\` ON \`_work_page_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`atelier_page\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`kicker\` text DEFAULT 'The Atelier',
  	\`headline\` text DEFAULT 'Strategy, creativity and attention to every detail.',
  	\`intro\` text DEFAULT 'ETÉRA is an independent creative atelier built around the belief that strong brands are shaped through the right balance of strategy, creativity, cultural context, and effort.',
  	\`aether_narrative\` text DEFAULT 'The Aether narrative and founder/team content will be shaped once the final brand materials arrive.',
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`atelier_page__status_idx\` ON \`atelier_page\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`atelier_page_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`people_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`atelier_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`people_id\`) REFERENCES \`people\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`atelier_page_rels_order_idx\` ON \`atelier_page_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`atelier_page_rels_parent_idx\` ON \`atelier_page_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`atelier_page_rels_path_idx\` ON \`atelier_page_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`atelier_page_rels_people_id_idx\` ON \`atelier_page_rels\` (\`people_id\`);`)
  await db.run(sql`CREATE TABLE \`_atelier_page_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`version_kicker\` text DEFAULT 'The Atelier',
  	\`version_headline\` text DEFAULT 'Strategy, creativity and attention to every detail.',
  	\`version_intro\` text DEFAULT 'ETÉRA is an independent creative atelier built around the belief that strong brands are shaped through the right balance of strategy, creativity, cultural context, and effort.',
  	\`version_aether_narrative\` text DEFAULT 'The Aether narrative and founder/team content will be shaped once the final brand materials arrive.',
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_atelier_page_v_version_version__status_idx\` ON \`_atelier_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_atelier_page_v_created_at_idx\` ON \`_atelier_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_atelier_page_v_updated_at_idx\` ON \`_atelier_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_atelier_page_v_latest_idx\` ON \`_atelier_page_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_atelier_page_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`people_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_atelier_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`people_id\`) REFERENCES \`people\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_atelier_page_v_rels_order_idx\` ON \`_atelier_page_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_atelier_page_v_rels_parent_idx\` ON \`_atelier_page_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_atelier_page_v_rels_path_idx\` ON \`_atelier_page_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_atelier_page_v_rels_people_id_idx\` ON \`_atelier_page_v_rels\` (\`people_id\`);`)
  await db.run(sql`CREATE TABLE \`services_page\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`kicker\` text DEFAULT 'Services',
  	\`headline\` text DEFAULT 'A compact services structure for launch.',
  	\`intro\` text DEFAULT 'Services are grouped into clear editorial areas so the first version stays focused and visual.',
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`services_page__status_idx\` ON \`services_page\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_services_page_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`version_kicker\` text DEFAULT 'Services',
  	\`version_headline\` text DEFAULT 'A compact services structure for launch.',
  	\`version_intro\` text DEFAULT 'Services are grouped into clear editorial areas so the first version stays focused and visual.',
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_page_v_version_version__status_idx\` ON \`_services_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_services_page_v_created_at_idx\` ON \`_services_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_page_v_updated_at_idx\` ON \`_services_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_page_v_latest_idx\` ON \`_services_page_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`contact_page\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`kicker\` text DEFAULT 'Contact',
  	\`headline\` text DEFAULT 'Let''s define your era.',
  	\`intro\` text DEFAULT 'The project inquiry form, booking path, and success state will be wired after the preferred workflow and booking tool are confirmed.',
  	\`email\` text DEFAULT 'hello@eteracreative.com',
  	\`success_message\` text DEFAULT 'Thank you. We''ve received your inquiry and will get back to you once we''ve reviewed the project details.',
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_page__status_idx\` ON \`contact_page\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_contact_page_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`version_kicker\` text DEFAULT 'Contact',
  	\`version_headline\` text DEFAULT 'Let''s define your era.',
  	\`version_intro\` text DEFAULT 'The project inquiry form, booking path, and success state will be wired after the preferred workflow and booking tool are confirmed.',
  	\`version_email\` text DEFAULT 'hello@eteracreative.com',
  	\`version_success_message\` text DEFAULT 'Thank you. We''ve received your inquiry and will get back to you once we''ve reviewed the project details.',
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_contact_page_v_version_version__status_idx\` ON \`_contact_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_contact_page_v_created_at_idx\` ON \`_contact_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_contact_page_v_updated_at_idx\` ON \`_contact_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_contact_page_v_latest_idx\` ON \`_contact_page_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_social_links_order_idx\` ON \`site_settings_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_social_links_parent_id_idx\` ON \`site_settings_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
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
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`DROP TABLE \`_services_v\`;`)
  await db.run(sql`DROP TABLE \`projects_results\`;`)
  await db.run(sql`DROP TABLE \`projects_gallery\`;`)
  await db.run(sql`DROP TABLE \`projects_collaborators\`;`)
  await db.run(sql`DROP TABLE \`projects\`;`)
  await db.run(sql`DROP TABLE \`projects_rels\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_version_results\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_version_gallery\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_version_collaborators\`;`)
  await db.run(sql`DROP TABLE \`_projects_v\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_rels\`;`)
  await db.run(sql`DROP TABLE \`people\`;`)
  await db.run(sql`DROP TABLE \`partners\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`home_page_method_steps\`;`)
  await db.run(sql`DROP TABLE \`home_page\`;`)
  await db.run(sql`DROP TABLE \`home_page_rels\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_version_method_steps\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v_rels\`;`)
  await db.run(sql`DROP TABLE \`work_page\`;`)
  await db.run(sql`DROP TABLE \`_work_page_v\`;`)
  await db.run(sql`DROP TABLE \`atelier_page\`;`)
  await db.run(sql`DROP TABLE \`atelier_page_rels\`;`)
  await db.run(sql`DROP TABLE \`_atelier_page_v\`;`)
  await db.run(sql`DROP TABLE \`_atelier_page_v_rels\`;`)
  await db.run(sql`DROP TABLE \`services_page\`;`)
  await db.run(sql`DROP TABLE \`_services_page_v\`;`)
  await db.run(sql`DROP TABLE \`contact_page\`;`)
  await db.run(sql`DROP TABLE \`_contact_page_v\`;`)
  await db.run(sql`DROP TABLE \`site_settings_social_links\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
}
