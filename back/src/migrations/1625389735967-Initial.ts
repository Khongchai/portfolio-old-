import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1625389735967 implements MigrationInterface {
    name = 'Initial1625389735967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin_entity" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_2a4c8cb05264be7377c625c2715" UNIQUE ("email"), CONSTRAINT "PK_bc992df5ddb70aefb955b8a0c92" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "technology_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "UQ_335af9ef047bc75116f6f8ee572" UNIQUE ("title"), CONSTRAINT "PK_e943c6234b499b4bb4b2f7feec2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "shortDescription" character varying NOT NULL, "githubLink" character varying NOT NULL, "websiteLink" character varying, "imgLink" character varying, "tinyImgLink" character varying, "startDate" character varying NOT NULL, "endDate" character varying, "isHighlight" boolean, CONSTRAINT "UQ_d0bb39c7fc0bd40f20a55620474" UNIQUE ("title"), CONSTRAINT "PK_7a75a94e01d0b50bff123db1b87" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "technology_entity_front_end_in_project_entity" ("technologyEntityId" integer NOT NULL, "projectEntityId" integer NOT NULL, CONSTRAINT "PK_e141501f97c70b23434bd970ae5" PRIMARY KEY ("technologyEntityId", "projectEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bdc5449f95e5a37cfad2139396" ON "technology_entity_front_end_in_project_entity" ("technologyEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0ac6e288eb3e89c8a9e6a4ea6c" ON "technology_entity_front_end_in_project_entity" ("projectEntityId") `);
        await queryRunner.query(`CREATE TABLE "technology_entity_back_end_in_project_entity" ("technologyEntityId" integer NOT NULL, "projectEntityId" integer NOT NULL, CONSTRAINT "PK_1fbcb65fa2375ae2cf5a7d7849a" PRIMARY KEY ("technologyEntityId", "projectEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3e44d037f11d5b695d8571b263" ON "technology_entity_back_end_in_project_entity" ("technologyEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a1c499275a39d4bd9de130438b" ON "technology_entity_back_end_in_project_entity" ("projectEntityId") `);
        await queryRunner.query(`CREATE TABLE "technology_entity_language_of_project_entity" ("technologyEntityId" integer NOT NULL, "projectEntityId" integer NOT NULL, CONSTRAINT "PK_90c5666d8da7e50af32366d4c3a" PRIMARY KEY ("technologyEntityId", "projectEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d5c3abc29890ef71134f470656" ON "technology_entity_language_of_project_entity" ("technologyEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_55c9312a624608d7cdbf2fb416" ON "technology_entity_language_of_project_entity" ("projectEntityId") `);
        await queryRunner.query(`CREATE TABLE "technology_entity_hosting_project_entity" ("technologyEntityId" integer NOT NULL, "projectEntityId" integer NOT NULL, CONSTRAINT "PK_5ab3290c6f01036b999f74fabf1" PRIMARY KEY ("technologyEntityId", "projectEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f6dc6fc1f7a7498097da520a6b" ON "technology_entity_hosting_project_entity" ("technologyEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_74a6fb4488f6a86dd7328085f4" ON "technology_entity_hosting_project_entity" ("projectEntityId") `);
        await queryRunner.query(`ALTER TABLE "technology_entity_front_end_in_project_entity" ADD CONSTRAINT "FK_bdc5449f95e5a37cfad21393966" FOREIGN KEY ("technologyEntityId") REFERENCES "technology_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "technology_entity_front_end_in_project_entity" ADD CONSTRAINT "FK_0ac6e288eb3e89c8a9e6a4ea6c8" FOREIGN KEY ("projectEntityId") REFERENCES "project_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "technology_entity_back_end_in_project_entity" ADD CONSTRAINT "FK_3e44d037f11d5b695d8571b263b" FOREIGN KEY ("technologyEntityId") REFERENCES "technology_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "technology_entity_back_end_in_project_entity" ADD CONSTRAINT "FK_a1c499275a39d4bd9de130438ba" FOREIGN KEY ("projectEntityId") REFERENCES "project_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "technology_entity_language_of_project_entity" ADD CONSTRAINT "FK_d5c3abc29890ef71134f4706569" FOREIGN KEY ("technologyEntityId") REFERENCES "technology_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "technology_entity_language_of_project_entity" ADD CONSTRAINT "FK_55c9312a624608d7cdbf2fb4162" FOREIGN KEY ("projectEntityId") REFERENCES "project_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "technology_entity_hosting_project_entity" ADD CONSTRAINT "FK_f6dc6fc1f7a7498097da520a6bf" FOREIGN KEY ("technologyEntityId") REFERENCES "technology_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "technology_entity_hosting_project_entity" ADD CONSTRAINT "FK_74a6fb4488f6a86dd7328085f46" FOREIGN KEY ("projectEntityId") REFERENCES "project_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "technology_entity_hosting_project_entity" DROP CONSTRAINT "FK_74a6fb4488f6a86dd7328085f46"`);
        await queryRunner.query(`ALTER TABLE "technology_entity_hosting_project_entity" DROP CONSTRAINT "FK_f6dc6fc1f7a7498097da520a6bf"`);
        await queryRunner.query(`ALTER TABLE "technology_entity_language_of_project_entity" DROP CONSTRAINT "FK_55c9312a624608d7cdbf2fb4162"`);
        await queryRunner.query(`ALTER TABLE "technology_entity_language_of_project_entity" DROP CONSTRAINT "FK_d5c3abc29890ef71134f4706569"`);
        await queryRunner.query(`ALTER TABLE "technology_entity_back_end_in_project_entity" DROP CONSTRAINT "FK_a1c499275a39d4bd9de130438ba"`);
        await queryRunner.query(`ALTER TABLE "technology_entity_back_end_in_project_entity" DROP CONSTRAINT "FK_3e44d037f11d5b695d8571b263b"`);
        await queryRunner.query(`ALTER TABLE "technology_entity_front_end_in_project_entity" DROP CONSTRAINT "FK_0ac6e288eb3e89c8a9e6a4ea6c8"`);
        await queryRunner.query(`ALTER TABLE "technology_entity_front_end_in_project_entity" DROP CONSTRAINT "FK_bdc5449f95e5a37cfad21393966"`);
        await queryRunner.query(`DROP INDEX "IDX_74a6fb4488f6a86dd7328085f4"`);
        await queryRunner.query(`DROP INDEX "IDX_f6dc6fc1f7a7498097da520a6b"`);
        await queryRunner.query(`DROP TABLE "technology_entity_hosting_project_entity"`);
        await queryRunner.query(`DROP INDEX "IDX_55c9312a624608d7cdbf2fb416"`);
        await queryRunner.query(`DROP INDEX "IDX_d5c3abc29890ef71134f470656"`);
        await queryRunner.query(`DROP TABLE "technology_entity_language_of_project_entity"`);
        await queryRunner.query(`DROP INDEX "IDX_a1c499275a39d4bd9de130438b"`);
        await queryRunner.query(`DROP INDEX "IDX_3e44d037f11d5b695d8571b263"`);
        await queryRunner.query(`DROP TABLE "technology_entity_back_end_in_project_entity"`);
        await queryRunner.query(`DROP INDEX "IDX_0ac6e288eb3e89c8a9e6a4ea6c"`);
        await queryRunner.query(`DROP INDEX "IDX_bdc5449f95e5a37cfad2139396"`);
        await queryRunner.query(`DROP TABLE "technology_entity_front_end_in_project_entity"`);
        await queryRunner.query(`DROP TABLE "project_entity"`);
        await queryRunner.query(`DROP TABLE "technology_entity"`);
        await queryRunner.query(`DROP TABLE "admin_entity"`);
    }

}
