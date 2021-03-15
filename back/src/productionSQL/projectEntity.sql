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
              ((select id from technology_entity where title='Sass'), (select id from project_entity where title = 'ASTRUM')),
           insert into technology_entity_hosting_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('GitHub_Pages')),(select id from project_entity where title = 'ASTRUM'));
           insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('Javascript')), (select id from project_entity where title = 'ASTRUM'));


      insert into project_entity (title, description, "shortDescription", "githubLink", "websiteLink", "startDate", "endDate", "isHighlight") 
           values ('Journeys', 'A simple blog with custom-made navigation bar and timeline based on provided mdx data. This project makes a heavy use of css grid.', 
           'A simple blog with Gatsby', 
           'https://github.com/Khongchai/journeys', 
           'https://khongchai.github.io/journeys', 
           '2020-12-23', '2021-04-30', 'true');
           
           insert into technology_entity_front_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
              ((select id from technology_entity where title='Gatsby'), (select id from project_entity where title = 'Journeys')),
              ((select id from technology_entity where title='React'), (select id from project_entity where title = 'Journeys')),
              ((select id from technology_entity where title='styled-components'), (select id from project_entity where title = 'Journeys')),
           insert into technology_entity_hosting_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('GitHub_Pages')),(select id from project_entity where title = 'Journeys'));
           insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values  
           ((select id from technology_entity where title = 'Javascript'), (select id from project_entity where title = 'Journeys')), 
           ((select id from technology_entity where title = 'TypeScript'), (select id from project_entity where title = 'Journeys')); 
/* fix production data syntax below  */

      insert into project_entity (title, description, "shortDescription", "githubLink", "websiteLink", "startDate", "endDate", "isHighlight") 
           values ('WordMem', 'A vocab memorization application, allows for simple CRUD operation, auth (login, logout, register), and dictionary scraping with beautiful soup.', 
           'CRUD + Webscraping', 
           'https://github.com/Khongchai/WordMem', 
           'https://vocab-mem-front.herokuapp.com/', 
           '2020-10-11', '2021-02-16', 'false');
           
           insert into technology_entity_front_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
              ((select id from technology_entity where title='React'), (select id from project_entity where title = 'WordMem')),
              ((select id from technology_entity where title='Redux'), (select id from project_entity where title = 'WordMem'));
           insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title='Django'), (select id from project_entity where title = 'WordMem'));
           insert into technology_entity_hosting_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('Heroku')),(select id from project_entity where title = 'WordMem'));
           insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('Javascript')), (select id from project_entity where title = 'WordMem')); 
           insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('Python')), (select id from project_entity where title = 'WordMem')); 


      insert into project_entity (title, description, "shortDescription", "githubLink", "startDate", "isHighlight") 
           values ('VocabMem', 'A fully-fledged vocab memorization with features such as optional syntax-highlighting words that are already memorized and web-scraping for examples from movies scripts. This project is on hold.', 
           'WordMem''s bigger cousin', 
           'https://github.com/Khongchai/vocabmem', 
           '2021-02-09', 'false');
           
           insert into technology_entity_front_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
              ((select id from technology_entity where title='React'), (select id from project_entity where title = 'VocabMem')),
              ((select id from technology_entity where title='Chakra_UI'), (select id from project_entity where title = 'VocabMem')),
             ((select id from technology_entity where title='Apollo'), (select id from project_entity where title = 'VocabMem')),
              ((select id from technology_entity where title='Next.js'), (select id from project_entity where title = 'VocabMem'));
              ((select id from technology_entity where title='GraphQL'), (select id from project_entity where title = 'VocabMem'));
           insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title='Node'), (select id from project_entity where title = 'VocabMem')),
           insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title='Express'), (select id from project_entity where title = 'VocabMem')),
           insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title='PostgresQL'), (select id from project_entity where title = 'VocabMem')),
           insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title='Apollo'), (select id from project_entity where title = 'VocabMem')),
           insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title='TypeORM'), (select id from project_entity where title = 'VocabMem')),
           insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('TypeScript')), (select id from project_entity where title = 'VocabMem')); 
           

      insert into project_entity (title, description, "shortDescription", "githubLink", "startDate", "isHighlight") 
           values ('Portfolio', 'This portfolio website combines some of the hottest and newest technologies in 2021. Urql was chosen for front-end hydration thanks to its great customizability. Its out-of-the-box document caching is also great when you 
           want to just get started right away. As for Chakra UI, in my opinion, this far exceeds styled-components and bootstrap in terms of customizability and speed. Chakra has got almost everything you need out of the box, its mobile-first philosophy also allows for a very concise syntax. 
           Redis is preferred for storing admin session cookie because it''s super duper fast', 
           'A not-so-simple portfolio', 
           'https://github.com/Khongchai/portfolio', 
           '2021-01-10', 'true');
           
           insert into technology_entity_front_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
              ((select id from technology_entity where title='Next.js'), (select id from project_entity where title = 'Portfolio')),
              ((select id from technology_entity where title='React'), (select id from project_entity where title = 'Portfolio')),
              ((select id from technology_entity where title='Chakra UI'), (select id from project_entity where title = 'Portfolio')),
              ((select id from technology_entity where title='Urql'), (select id from project_entity where title = 'Portfolio')),
              ((select id from technology_entity where title='GraphQL'), (select id from project_entity where title = 'Portfolio'));
           insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title='Express'), (select id from project_entity where title = 'Portfolio'));
           insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title='Node'), (select id from project_entity where title = 'Portfolio'));
           insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title='TypeGraphQL'), (select id from project_entity where title = 'Portfolio'));
           insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title='TypeORM'), (select id from project_entity where title = 'Portfolio'));
           insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title='Redis'), (select id from project_entity where title = 'Portfolio'));
           insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title='PostgresQL'), (select id from project_entity where title = 'Portfolio'));
           insert into technology_entity_hosting_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('Heroku')),(select id from project_entity where title = 'Portfolio'));
           insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('Javascript')), (select id from project_entity where title = 'Portfolio')); 
           insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('TypeScript')), (select id from project_entity where title = 'Portfolio')); 
           insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('SQL')), (select id from project_entity where title = 'Portfolio')); 
