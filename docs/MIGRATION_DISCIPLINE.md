# Migration Discipline

Database migrations in `backend/*.sql` are source-controlled and treated as
ordered, immutable artifacts. The following rules govern how they are written,
reviewed, and applied.

## Rules

1. **Ordered migrations.** Each migration file has a numbered order comment.
   New migrations are appended at the end, never inserted between existing ones.

2. **Guard comments required.** Every migration file must start with a header
   block that includes:
   - A `⚠️ DESTRUCTIVE` or `⚠️ DATA-MODIFYING` warning if the migration deletes
     or updates existing data.
   - The migration order number.
   - The status (COMPLETED or PENDING).
   - A rollback procedure or a statement that rollback requires a backup.

3. **No automatic application.** Migrations are never applied automatically by
   agents, CI, or scripts. A human must review the SQL, run it in the Supabase
   SQL Editor, and verify the result.

4. **Destructive operations require explicit guards.** Any `DELETE FROM`,
   `TRUNCATE`, `DROP TABLE`, or `ALTER TABLE ... DROP` must be preceded by a
   comment explaining why the operation is necessary and what data is lost.

5. **Backfill before delete.** When a migration changes a column or table
   structure, backfill existing rows before removing the old structure.

6. **Test on a branch.** If Supabase branching is available, test the migration
   on a branch before applying it to production.

7. **Agent boundary.** The Supabase Change Planner may inspect the schema and
   produce migration proposals, but it must not apply them. Production writes
   require human approval.

## Current migration order

| #   | File                        | Status    | Destructive                 |
| --- | --------------------------- | --------- | --------------------------- |
| 1   | `migrate_real_data.sql`     | COMPLETED | Yes (DELETE all tables)     |
| 2   | `restructure_hierarchy.sql` | COMPLETED | Yes (UPDATE parent_id, uri) |
| 3   | `add_profile_photo.sql`     | COMPLETED | No (ADD COLUMN)             |
| 4   | `add_iimb_images.sql`       | COMPLETED | No (INSERT)                 |
| 5   | `add_homepage_flags.sql`    | COMPLETED | No (ADD COLUMN + UPDATE)    |

## Guard script

Run `node scripts/check-sql-migrations.mjs` to verify that all migration files
have proper guard comments and that destructive operations are documented.
