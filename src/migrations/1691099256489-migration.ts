import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1691099256489 implements MigrationInterface {
    name = 'migration1691099256489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "wallet" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c5a97c2e62b0c759e2c16d411cd" UNIQUE ("wallet"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "likes_track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token_id" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_a926edb1489a65713ab2082d114" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shopping_cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token_id" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_40f9358cdf55d73d8a2ad226592" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "likes_track" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "likes_track" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "likes_track" ADD "creator_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes_track" ADD "likes" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "likes_track" ADD "plays" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "likes_track" ADD CONSTRAINT "UQ_f13a9ada3baa1379ed5eb0ec0da" UNIQUE ("token_id")`);
        await queryRunner.query(`ALTER TABLE "likes_track" ADD CONSTRAINT "FK_1e4ae3405673f5d3372b7b6735f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" ADD CONSTRAINT "FK_bee83828c1e181ac7ba97267ca2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_cart" DROP CONSTRAINT "FK_bee83828c1e181ac7ba97267ca2"`);
        await queryRunner.query(`ALTER TABLE "likes_track" DROP CONSTRAINT "FK_1e4ae3405673f5d3372b7b6735f"`);
        await queryRunner.query(`ALTER TABLE "likes_track" DROP CONSTRAINT "UQ_f13a9ada3baa1379ed5eb0ec0da"`);
        await queryRunner.query(`ALTER TABLE "likes_track" DROP COLUMN "plays"`);
        await queryRunner.query(`ALTER TABLE "likes_track" DROP COLUMN "likes"`);
        await queryRunner.query(`ALTER TABLE "likes_track" DROP COLUMN "creator_id"`);
        await queryRunner.query(`ALTER TABLE "likes_track" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "likes_track" ADD "userId" uuid`);
        await queryRunner.query(`DROP TABLE "shopping_cart"`);
        await queryRunner.query(`DROP TABLE "likes_track"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
