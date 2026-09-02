import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`atelier_page_team_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`position\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`atelier_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`atelier_page_team_members_order_idx\` ON \`atelier_page_team_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`atelier_page_team_members_parent_id_idx\` ON \`atelier_page_team_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_atelier_page_v_version_team_members\` (
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
  await db.run(sql`CREATE INDEX \`_atelier_page_v_version_team_members_order_idx\` ON \`_atelier_page_v_version_team_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_atelier_page_v_version_team_members_parent_id_idx\` ON \`_atelier_page_v_version_team_members\` (\`_parent_id\`);`)
  await db.run(sql`INSERT INTO \`atelier_page_team_members\` (\`_order\`, \`_parent_id\`, \`id\`, \`name\`, \`position\`, \`description\`)
    SELECT 0, \`id\`, '78d33c0a-69b2-4c1c-9bc4-49fbb86f8380', 'Alexandra Djurdjevic', 'Brand & Marketing Strategist', 'Alexandra builds meaningful brand narratives through strategy, storytelling and community. Her experience spans financial services, consumer brands, NGOs and local businesses, with a focus on identity, content and campaigns that inspire action.'
    FROM \`atelier_page\`
    WHERE NOT EXISTS (SELECT 1 FROM \`atelier_page_team_members\` WHERE \`_parent_id\` = \`atelier_page\`.\`id\`);`)
  await db.run(sql`INSERT INTO \`atelier_page_team_members\` (\`_order\`, \`_parent_id\`, \`id\`, \`name\`, \`position\`, \`description\`)
    SELECT 1, \`id\`, 'ae167830-98d2-49b9-a0b6-f46393e9db7a', 'Yoana Stoyanova', 'Marketing Expert & Creative Strategist', 'Yoana combines analytical thinking with creative direction across online and offline campaigns. Her work spans experiential activations, paid social, photoshoot direction and storyboarding, always focused on meaningful, results-driven ideas.'
    FROM \`atelier_page\`
    WHERE EXISTS (SELECT 1 FROM \`atelier_page_team_members\` WHERE \`_parent_id\` = \`atelier_page\`.\`id\` AND \`id\` = '78d33c0a-69b2-4c1c-9bc4-49fbb86f8380')
      AND NOT EXISTS (SELECT 1 FROM \`atelier_page_team_members\` WHERE \`_parent_id\` = \`atelier_page\`.\`id\` AND \`id\` = 'ae167830-98d2-49b9-a0b6-f46393e9db7a');`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`atelier_page_team_members\`;`)
  await db.run(sql`DROP TABLE \`_atelier_page_v_version_team_members\`;`)
}
