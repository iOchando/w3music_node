import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1691100504754 implements MigrationInterface {
    name = 'migration1691100504754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token_id" character varying NOT NULL, "creator_id" character varying NOT NULL, "likes" integer NOT NULL DEFAULT '0', "plays" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_3303fe4de7c4ac406aac8bab69b" UNIQUE ("token_id"), CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "likes_track" DROP COLUMN "creator_id"`);
        await queryRunner.query(`ALTER TABLE "likes_track" DROP COLUMN "likes"`);
        await queryRunner.query(`ALTER TABLE "likes_track" DROP COLUMN "plays"`);
        await queryRunner.query(`ALTER TABLE "likes_track" DROP CONSTRAINT "UQ_f13a9ada3baa1379ed5eb0ec0da"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes_track" ADD CONSTRAINT "UQ_f13a9ada3baa1379ed5eb0ec0da" UNIQUE ("token_id")`);
        await queryRunner.query(`ALTER TABLE "likes_track" ADD "plays" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "likes_track" ADD "likes" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "likes_track" ADD "creator_id" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "track"`);
    }

}
