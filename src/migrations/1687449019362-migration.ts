import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1687449019362 implements MigrationInterface {
    name = 'migration1687449019362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shopping_cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "wallet" character varying, "token_id" character varying NOT NULL, CONSTRAINT "UQ_c9430e9db695f674eef5164633a" UNIQUE ("wallet"), CONSTRAINT "PK_40f9358cdf55d73d8a2ad226592" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "token_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "token_id" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "shopping_cart"`);
    }

}
