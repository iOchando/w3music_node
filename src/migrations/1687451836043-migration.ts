import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1687451836043 implements MigrationInterface {
    name = 'migration1687451836043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_cart" DROP CONSTRAINT "UQ_c9430e9db695f674eef5164633a"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_cart" ADD CONSTRAINT "UQ_c9430e9db695f674eef5164633a" UNIQUE ("wallet")`);
    }

}
