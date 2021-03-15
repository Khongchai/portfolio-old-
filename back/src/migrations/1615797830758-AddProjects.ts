import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProjects1615797830763 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      alter sequence project_entity_id_seq restart with 1;
      insert into project_entity (title, description, "shortDescription", "githubLink", "websiteLink", "startDate", "endDate", "isHighlight") 
           values ('ASTRUM', 'The artistic project ASTRUM is an interdisciplinary project combining different 
           aspects of music, music production, and technology to help tell the story about our relationship with the solar system. 
           The outcomes of this projects are a website that, with the help of the NASA''s Eyes, explore our relationship 
           with the solar system through 8 pieces of music and a set of stories written by Lourna Mydes Quinto, and an Android application 
           that allows for an interaction with binaural pieces that use elements from the aforementioned 8 pieces of music.', 
           '99% pure HTML/CSS/Javascript', 
           'https://github.com/Khongchai/ASTRUM-2020', 
           'https://khongchai.github.io/ASTRUM-2020/', 
           '2019-06-15', '2020-07-25', 'true');
           
           insert into technology_entity_front_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
              ((select id from technology_entity where title='jQuery'), (select id from project_entity where title = 'ASTRUM')),
              ((select id from technology_entity where title='Sass'), (select id from project_entity where title = 'ASTRUM'));
           insert into technology_entity_hosting_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('GitHub_Pages')),(select id from project_entity where title = 'ASTRUM'));
           insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('Javascript')), (select id from project_entity where title = 'ASTRUM'));
     
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
