DROP DATABASE IF EXISTS `ideasforce`;

CREATE DATABASE `ideasforce`;

USE `ideasforce`;

-- -------------------------------------------------------

-- CREATING TABLES

-- -------------------------------------------------------

-- CREATING COLORS TABLE

DROP TABLE IF EXISTS `color`;

CREATE TABLE
    `color` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `name` varchar(45) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- CREATING USERS TABLE

DROP TABLE IF EXISTS `user`;

CREATE TABLE
    IF NOT EXISTS `user` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `firstname` VARCHAR(255) NULL,
        `lastname` VARCHAR(255) NULL,
        `email` VARCHAR(255) NOT NULL UNIQUE,
        `password` VARCHAR(255) NOT NULL,
        `phone_number` VARCHAR(22) NULL,
        `picture_url` LONGTEXT NULL,
        `is_salesforce_admin` TINYINT NOT NULL DEFAULT 0,
        `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `color_id` INT NULL,
        `has_accepted_invitation` TINYINT NOT NULL DEFAULT 0,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- CREATING COMPANY TABLE

DROP TABLE IF EXISTS `company`;

CREATE TABLE
    IF NOT EXISTS `company` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(255) NOT NULL,
        `slug` VARCHAR(255) NOT NULL UNIQUE,
        `baseline` VARCHAR(255) NULL,
        `siret` VARCHAR(255) NULL,
        `type` VARCHAR(255) NULL,
        `sector` VARCHAR(255) NULL,
        `logo_url` LONGTEXT NULL,
        `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `color_id` INT NOT NULL DEFAULT 6,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- CREATING CONTRACT TABLE

DROP TABLE IF EXISTS `contract`;

CREATE TABLE
    IF NOT EXISTS `contract` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `company_id` INT NOT NULL,
        `name` VARCHAR(255) NOT NULL,
        `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `expiration_date` TIMESTAMP NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- CREATING TEAM TABLE

DROP TABLE IF EXISTS `team`;

CREATE TABLE
    IF NOT EXISTS `team` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(255) NULL,
        `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `is_private` TINYINT NOT NULL DEFAULT 0,
        `picture_url` LONGTEXT NULL,
        `description` VARCHAR(255) NULL,
        `objective` VARCHAR(255) NULL,
        `status` VARCHAR(45) NULL,
        `user_id` INT NOT NULL,
        `company_id` INT NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- CREATING WORKSPACE TABLE

DROP TABLE IF EXISTS `workspace`;

CREATE TABLE
    IF NOT EXISTS `workspace` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(255) NOT NULL,
        `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `description` VARCHAR(255) NULL,
        `is_private` TINYINT NOT NULL DEFAULT 0,
        `team_id` INT NULL,
        `user_id` INT NOT NULL,
        `company_id` INT NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- CREATING IDEAS GROUP TABLE

DROP TABLE IF EXISTS `ideas_group`;

CREATE TABLE
    IF NOT EXISTS `ideas_group` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name_group` VARCHAR(255) NULL,
        `workspace_id` INT NOT NULL,
        `x_coordinate` INT NULL,
        `y_coordinate` INT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- CREATING IDEA TABLE

DROP TABLE IF EXISTS `idea`;

CREATE TABLE
    IF NOT EXISTS `idea` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `parent_idea_id` INT NULL,
        `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `title` VARCHAR(255) NOT NULL,
        `description` MEDIUMTEXT NULL,
        `status` VARCHAR(45) NOT NULL DEFAULT 'published',
        `x_coordinate` INT NULL,
        `y_coordinate` INT NULL,
        `color_id` INT NULL,
        `company_id` INT NOT NULL,
        `user_id` INT NOT NULL,
        `workspace_id` INT NULL,
        `ideas_group_id` INT NULL,
        `team_id` INT NULL,
        `file_id` INT NULL,
        `is_in_board` TINYINT NOT NULL DEFAULT 0,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- CREATING FILE TABLE

DROP TABLE IF EXISTS `file`;

CREATE TABLE
    IF NOT EXISTS `file` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(255) NULL,
        `import_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `type` VARCHAR(45) NULL,
        `url` LONGTEXT NOT NULL,
        `idea_id` INT NOT NULL,
        `user_id` INT NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- CREATING COMMENT TABLE

DROP TABLE IF EXISTS `comment`;

CREATE TABLE
    IF NOT EXISTS `comment` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `content` MEDIUMTEXT NULL,
        `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `idea_id` INT NOT NULL,
        `user_id` INT NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- CREATING LIKE TABLE

DROP TABLE IF EXISTS `liked`;

CREATE TABLE
    IF NOT EXISTS `liked` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `idea_id` INT NOT NULL,
        `user_id` INT NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- CREATING CATEGORY TABLE

DROP TABLE IF EXISTS `category`;

CREATE TABLE
    IF NOT EXISTS `category` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(45) NOT NULL,
        `color_id` INT NOT NULL,
        `company_id` INT NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- CREATING TAG TABLE

DROP TABLE IF EXISTS `tag`;

CREATE TABLE
    IF NOT EXISTS `tag` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(45) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- CREATING TAG HAS IDEA TABLE

DROP TABLE IF EXISTS `idea_has_tag`;

CREATE TABLE
    IF NOT EXISTS `idea_has_tag` (
        `tag_id` INT NOT NULL,
        `idea_id` INT NOT NULL
    ) ENGINE = InnoDB;

-- CREATING TEAM HAS USER TABLE

DROP TABLE IF EXISTS `team_has_user`;

CREATE TABLE
    IF NOT EXISTS `team_has_user` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `team_id` INT NOT NULL,
        `user_id` INT NOT NULL,
        `joining_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `is_favorite_team` TINYINT NOT NULL DEFAULT 0,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- CREATING CATEGORY HAS IDEA TABLE

DROP TABLE IF EXISTS `category_has_idea`;

CREATE TABLE
    IF NOT EXISTS `category_has_idea` (
        `category_id` INT NOT NULL,
        `idea_id` INT NOT NULL
    ) ENGINE = InnoDB;

-- CREATING USER HAS COMPANY TABLE

DROP TABLE IF EXISTS `user_has_company`;

CREATE TABLE
    IF NOT EXISTS `user_has_company` (
        `user_id` INT NOT NULL,
        `company_id` INT NOT NULL,
        `biography` LONGTEXT NULL,
        `function` VARCHAR(80) NULL,
        `is_company_admin` TINYINT NOT NULL DEFAULT 0
    ) ENGINE = InnoDB;

-- CREATING WORKSPACE HAS USER TABLE

DROP TABLE IF EXISTS `workspace_has_user`;

CREATE TABLE
    IF NOT EXISTS `workspace_has_user` (
        `workspace_id` INT NOT NULL,
        `user_id` INT NOT NULL,
        `is_favorite_workspace` TINYINT NOT NULL DEFAULT 0
    ) ENGINE = InnoDB;

-- -------------------------------------------------------

-- CREATING FOREIGN KEYS

-- -------------------------------------------------------

-- USER

ALTER TABLE `user`
ADD
    CONSTRAINT `fk_user_color` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`);

-- COMPANY

ALTER TABLE `company`
ADD
    CONSTRAINT `fk_company_color` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`);

-- CONTRACT

ALTER TABLE `contract`
ADD
    CONSTRAINT `fk_contract_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`);

-- TEAM

ALTER TABLE `team`
ADD
    CONSTRAINT `fk_team_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
ADD
    CONSTRAINT `fk_team_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`);

-- WORKSPACE

ALTER TABLE `workspace`
ADD
    CONSTRAINT `fk_workspace_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`),
ADD
    CONSTRAINT `fk_workspace_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
ADD
    CONSTRAINT `fk_workspace_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`);

-- IDEA GROUP

ALTER TABLE `ideas_group`
ADD
    CONSTRAINT `fk_ideas_group_workspace` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`) ON DELETE CASCADE;

-- IDEA

ALTER TABLE `idea`
ADD
    CONSTRAINT `fk_idea_color` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`),
ADD
    CONSTRAINT `fk_idea_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
ADD
    CONSTRAINT `fk_idea_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
ADD
    CONSTRAINT `fk_idea_workspace` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`) ON DELETE CASCADE,
ADD
    CONSTRAINT `fk_idea_ideas_group` FOREIGN KEY (`ideas_group_id`) REFERENCES `ideas_group` (`id`) ON DELETE
SET NULL,
ADD
    CONSTRAINT `fk_idea_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`),
ADD
    CONSTRAINT `fk_idea_file` FOREIGN KEY (`file_id`) REFERENCES `file` (`id`) ON DELETE CASCADE;

-- FILE

ALTER TABLE `file`
ADD
    CONSTRAINT `fk_file_idea` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`) ON DELETE CASCADE,
ADD
    CONSTRAINT `fk_file_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

-- COMMENT

ALTER TABLE `comment`
ADD
    CONSTRAINT `fk_comment_idea` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`) ON DELETE CASCADE,
ADD
    CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

-- LIKE

ALTER TABLE `liked`
ADD
    CONSTRAINT `fk_liked_idea` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`) ON DELETE CASCADE,
ADD
    CONSTRAINT `fk_liked_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

-- CATEGORY

ALTER TABLE `category`
ADD
    CONSTRAINT `fk_category_color` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`),
ADD
    CONSTRAINT `fk_category_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`);

-- IDEA HAS TAG

ALTER TABLE `idea_has_tag`
ADD
    CONSTRAINT `fk_idea_has_tag_tag` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`),
ADD
    CONSTRAINT `fk_idea_has_tag_idea` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`);

-- TEAM HAS USER

ALTER TABLE `team_has_user`
ADD
    CONSTRAINT `fk_team_has_user_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`),
ADD
    CONSTRAINT `fk_team_has_user_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

-- CATEGORY HAS IDEA

ALTER TABLE
    `category_has_idea`
ADD
    CONSTRAINT `fk_category_has_idea_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
ADD
    CONSTRAINT `fk_category_has_idea_idea` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`) ON DELETE CASCADE;

-- USER HAS COMPANY

ALTER TABLE `user_has_company`
ADD
    CONSTRAINT `fk_user_has_company_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
ADD
    CONSTRAINT `fk_user_has_company_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`);

-- WORKSPACE HAS USER

ALTER TABLE
    `workspace_has_user`
ADD
    CONSTRAINT `fk_workspace_has_user_workspace` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`) ON DELETE CASCADE,
ADD
    CONSTRAINT `fk_workspace_has_user_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

-- -------------------------------------------------------

-- ADDING CONTENT

-- -------------------------------------------------------

-- COLORS

INSERT INTO `color` (`name`)
VALUES ("rose"), ("pink"), ("fuchsia"), ("purple"), ("violet"), ("indigo"), ("blue"), ("sky"), ("cyan"), ("teal"), ("emerald"), ("green"), ("lime"), ("yellow"), ("amber"), ("orange"), ("red");

-- USERS

INSERT INTO
    `user` (
        `firstname`,
        `lastname`,
        `email`,
        `password`,
        `picture_url`,
        `is_salesforce_admin`,
        `has_accepted_invitation`
    )
VALUES (
        'Cédric',
        'Palacio-Vidal',
        'cedric.palacio@gmail.com',
        '$argon2id$v=19$m=65536,t=5,p=1$4PxtA5qNt2r39SyKbo2kaQ$24kugoP+Kh+xzTTFDJdYxYR/hDfAT3By+wIQtepQy8U',
        'https://res.cloudinary.com/dmmifezda/image/upload/v1689019795/profile-pictures/cedric_wxfm8y.jpg',
        1,
        1
    ), (
        'Alain',
        'Bide',
        'almasyser@wanadoo.fr',
        '$argon2id$v=19$m=65536,t=5,p=1$vUAPptBxVfStgTgdirr6rA$bN4GbdqV3kkqICI7aiXkaDmqGA6qcYqZNcU3X2xp41c',
        null,
        1,
        1
    ), (
        'Mehdi',
        'Berbedj',
        'berbedj.mehdi@gmail.com',
        '$argon2id$v=19$m=65536,t=5,p=1$sFLuxVkfaF1+XG630y1VzQ$mZLbG8GWw6O3Fx0qUipFIHrmuRVktm2Cy5178IRbjOI',
        'https://res.cloudinary.com/dmmifezda/image/upload/v1689019795/profile-pictures/mehdi_zv4kmk.png',
        1,
        1
    ), (
        'Charlie',
        'Feix',
        'charlie.feix@gmail.com',
        '$argon2id$v=19$m=65536,t=5,p=1$f/fZo3zl1ksKvFkAlef5bg$JJADFRcFiEi/GG1pNgPx44ci4hXEUzp6XXmcdX+EU/M',
        'https://res.cloudinary.com/dmmifezda/image/upload/v1689019795/profile-pictures/charlie_vppxgf.jpg',
        0,
        1
    ), (
        'François',
        'Dubois',
        'francoisdubois@example.com',
        'hello',
        null,
        0,
        1
    ), (
        'Émilie',
        'Moreau',
        'emiliemoreau@example.com',
        'hello',
        null,
        0,
        1
    ), (
        'Nicolas',
        'Leroy',
        'nicolasleroy@example.com',
        'hello',
        null,
        0,
        0
    ), (
        'Charlotte',
        'Garcia',
        'charlottegarcia@example.com',
        'hello',
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
        0,
        1
    ), (
        'Thomas',
        'Fournier',
        'thomasfournier@example.com',
        'hello',
        'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
        0,
        1
    ), (
        'Julie',
        'Robin',
        'julierobin@example.com',
        'hello',
        null,
        0,
        1
    ), (
        'Antoine',
        'Petit',
        'antoinepetit@example.com',
        'hello',
        null,
        0,
        0
    ), (
        'Camille',
        'Rousseau',
        'camillerousseau@example.com',
        'hello',
        null,
        0,
        1
    );

-- COMPANIES

INSERT INTO
    `company` (
        `name`,
        `baseline`,
        `slug`,
        `siret`,
        `type`,
        `sector`,
        `logo_url`,
        `creation_date`,
        `color_id`
    )
VALUES (
        'Acme Corporation',
        null,
        'acme-corporation',
        '12345678900010',
        'SA',
        'Technologie',
        null,
        '2023-05-21 11:00:00',
        6
    ), (
        'Globex Industries',
        null,
        'globex-industries',
        '98765432100020',
        'SARL',
        'Manufacturing',
        null,
        '2022-12-21 17:30:00',
        6
    ), (
        'CookBuddy',
        null,
        'cookbuddy',
        '56789012300030',
        'SAS',
        'Cooking',
        "https://res.cloudinary.com/dmmifezda/image/upload/v1689016811/logos/logo-cookbuddy_zxupn6.svg",
        '2023-05-21 11:00:00',
        12
    ), (
        'EcoTech Ventures',
        null,
        'ecotech-ventures',
        '45678901200040',
        'SCOP',
        'Environnement',
        null,
        '2023-05-21 11:00:00',
        1
    ), (
        'ABC Corporation',
        'Building a better future',
        'abc-corporation',
        '123456789',
        'Public',
        'Technology',
        'https://example.com/logo1.png',
        '2022-01-15 09:30:00',
        3
    ), (
        'XYZ Corporation',
        'Innovating for a better tomorrow',
        'xyz-corporation',
        '987654321',
        'Private',
        'Engineering',
        'https://example.com/logo2.png',
        '2022-03-10 14:45:00',
        2
    ), (
        '123 Industries',
        'Quality products for every need',
        '123-industries',
        '9876543210',
        'Private',
        'Manufacturing',
        'https://example.com/logo3.png',
        '2022-06-05 11:20:00',
        4
    );

-- CONTRACT

INSERT INTO
    `contract` (
        `company_id`,
        `name`,
        `creation_date`,
        `expiration_date`
    )
VALUES (
        1,
        'Contract 1',
        '2023-06-21 12:00:00',
        '2024-06-21 12:00:00'
    ), (
        2,
        'Contract 2',
        '2023-06-21 13:30:00',
        NULL
    ), (
        3,
        'Contract 3',
        '2023-06-21 14:45:00',
        '2025-06-21 12:00:00'
    );

-- TEAM

INSERT INTO
    `team` (
        `name`,
        `creation_date`,
        `is_private`,
        `picture_url`,
        `description`,
        `objective`,
        `status`,
        `user_id`,
        `company_id`
    )
VALUES (
        'La team1',
        '2023-06-21 12:00:00',
        1,
        'https://example.com/team1.jpg',
        'Description of Team 1',
        'Objective of Team 1',
        'Active',
        1,
        1
    ), (
        'Team 2',
        '2023-06-21 13:30:00',
        0,
        NULL,
        'Description of Team 2',
        'Objective of Team 2',
        'Inactive',
        2,
        2
    ), (
        'Team 3',
        '2023-06-21 14:45:00',
        0,
        'https://example.com/team3.jpg',
        'Description of Team 3',
        'Objective of Team 3',
        'Active',
        4,
        1
    ), (
        'Team 4',
        '2023-06-21 15:15:00',
        1,
        NULL,
        NULL,
        NULL,
        'Active',
        3,
        3
    );

--  WORKSPACE

INSERT INTO
    `workspace` (
        `name`,
        `creation_date`,
        `update_date`,
        `description`,
        `is_private`,
        `team_id`,
        `user_id`,
        `company_id`
    )
VALUES (
        'Développement produit',
        '2023-06-21 12:00:00',
        '2023-06-21 14:30:00',
        'Nouvelles fonctionnalités à développer',
        1,
        1,
        4,
        3
    ), (
        'Workspace 2',
        '2023-06-21 13:30:00',
        '2023-06-21 16:45:00',
        'Description of Workspace 2',
        0,
        NULL,
        1,
        1
    ), (
        'Workspace 3',
        '2023-06-21 14:45:00',
        '2023-06-21 18:15:00',
        NULL,
        0,
        2,
        2,
        2
    ), (
        'Workspace 4',
        '2023-06-21 15:15:00',
        '2023-06-21 19:30:00',
        'Description of Workspace 4',
        0,
        1,
        1,
        3
    );

--  IDEAS GROUP

INSERT INTO
    `ideas_group` (
        `name_group`,
        `workspace_id`,
        `x_coordinate`,
        `y_coordinate`
    )
VALUES ('Group 1', 1, 0, 0), ('Group 2', 2, 50, 150), ('Group 3', 1, 0, 0), ('Group 4', 4, 120, 40);

--  IDEA

INSERT INTO
    `idea` (
        `parent_idea_id`,
        `creation_date`,
        `title`,
        `description`,
        `status`,
        `x_coordinate`,
        `y_coordinate`,
        `color_id`,
        `company_id`,
        `user_id`,
        `workspace_id`,
        `ideas_group_id`,
        `team_id`,
        `file_id`,
        `is_in_board`
    )
VALUES (
        NULL,
        '2023-06-21 12:00:00',
        'Idea 1',
        'Description of Idea 1',
        'published',
        100,
        200,
        1,
        1,
        1,
        2,
        NULL,
        NULL,
        NULL,
        1
    ), (
        4,
        '2023-06-21 14:45:00',
        'Idea 3',
        'Description of Idea 3',
        'published',
        150,
        250,
        1,
        2,
        1,
        2,
        NULL,
        NULL,
        NULL,
        0
    ), (
        NULL,
        '2023-06-21 13:30:00',
        'Idea 2',
        NULL,
        'published',
        300,
        400,
        2,
        2,
        2,
        2,
        1,
        NULL,
        NULL,
        1
    ), (
        NULL,
        '2023-06-21 15:15:00',
        'Idea 4',
        'Description of Idea 4',
        'published',
        500,
        600,
        3,
        2,
        3,
        2,
        NULL,
        NULL,
        NULL,
        1
    ), (
        NULL,
        '2023-07-10 00:00:00',
        'Fonctionnalité de recherche avancée',
        'Permettre aux utilisateurs de trouver des recettes spécifiques en utilisant des filtres tels que les ingrédients, le temps de préparation, les régimes alimentaires, etc.',
        'published',
        NULL,
        NULL,
        NULL,
        3,
        1,
        1,
        NULL,
        NULL,
        NULL,
        0
    ), (
        NULL,
        '2023-07-10 00:00:00',
        'Section recettes populaires',
        'Mettre en évidence les recettes populaires et les tendances actuelles pour inspirer les utilisateurs.',
        'published',
        NULL,
        NULL,
        NULL,
        3,
        1,
        1,
        NULL,
        NULL,
        NULL,
        0
    ), (
        NULL,
        '2023-07-10 00:00:00',
        'Planification des repas et listes d\'achats',
        'Permettre aux utilisateurs de planifier leurs repas pour la semaine et générer automatiquement des listes d\'achats basées sur les recettes sélectionnées.',
        'published',
        NULL,
        NULL,
        NULL,
        3,
        1,
        1,
        NULL,
        NULL,
        NULL,
        0
    ), (
        NULL,
        '2023-07-10 00:00:00',
        'Partage de recettes',
        'Permettre aux utilisateurs de partager leurs propres recettes avec la communauté de l\'application.',
        'published',
        NULL,
        NULL,
        NULL,
        3,
        1,
        1,
        NULL,
        NULL,
        NULL,
        0
    ), (
        NULL,
        '2023-07-10 00:00:00',
        'Conversion des mesures et des unités',
        'Offrir aux utilisateurs la possibilité de convertir facilement les mesures et les unités d\'ingrédients pour s\'adapter à leurs besoins.',
        'published',
        NULL,
        NULL,
        NULL,
        3,
        1,
        1,
        NULL,
        NULL,
        NULL,
        0
    ), (
        NULL,
        '2023-07-10 00:00:00',
        'Catégorie recettes végétariennes et véganes',
        'Mettre en évidence les recettes végétariennes et véganes pour répondre aux besoins des utilisateurs ayant des régimes alimentaires spécifiques.',
        'published',
        NULL,
        NULL,
        NULL,
        3,
        1,
        1,
        NULL,
        NULL,
        NULL,
        0
    ), (
        NULL,
        '2023-07-10 00:00:00',
        'Système de notation et de commentaires',
        'Permettre aux utilisateurs de noter et de commenter les recettes, afin de partager leurs avis et leurs astuces.',
        'published',
        NULL,
        NULL,
        NULL,
        3,
        1,
        1,
        NULL,
        NULL,
        NULL,
        0
    ), (
        NULL,
        '2023-07-10 00:00:00',
        'Suggestions de recettes personnalisées',
        'Utiliser des algorithmes de recommandation pour suggérer des recettes en fonction des préférences et des habitudes de l\'utilisateur.',
        'published',
        NULL,
        NULL,
        NULL,
        3,
        1,
        1,
        NULL,
        NULL,
        NULL,
        0
    ), (
        NULL,
        '2023-07-10 00:00:00',
        'Section astuces et conseils culinaires',
        'Fournir aux utilisateurs des astuces et des conseils culinaires pour les aider à améliorer leurs compétences en cuisine.',
        'published',
        NULL,
        NULL,
        NULL,
        3,
        1,
        1,
        NULL,
        NULL,
        NULL,
        0
    ), (
        NULL,
        '2023-07-10 00:00:00',
        'Intégrer une fonctionnalité de planification de repas pour des régimes spécifiques',
        'Permettre aux utilisateurs de planifier des repas adaptés à des régimes spécifiques tels que le régime cétogène, sans gluten, etc.',
        'published',
        NULL,
        NULL,
        NULL,
        3,
        1,
        NULL,
        NULL,
        NULL,
        NULL,
        0
    );

--  FILE

INSERT INTO
    `file` (
        `name`,
        `import_date`,
        `type`,
        `url`,
        `idea_id`,
        `user_id`
    )
VALUES (
        'File 1',
        '2023-06-21 12:00:00',
        'pdf',
        'https://example.com/file1.pdf',
        1,
        1
    ), (
        'File 2',
        '2023-06-21 13:30:00',
        'pdf',
        'https://example.com/file2.pdf',
        2,
        2
    ), (
        'File 3',
        '2023-06-21 14:45:00',
        'pdf',
        'https://example.com/file3.pdf',
        3,
        1
    ), (
        'File 4',
        '2023-06-21 15:15:00',
        'pdf',
        'https://example.com/file4.pdf',
        4,
        3
    );

--  COMMENT

INSERT INTO
    `comment` (
        `content`,
        `creation_date`,
        `idea_id`,
        `user_id`
    )
VALUES (
        'Comment 1',
        '2023-06-21 12:00:00',
        1,
        1
    ), (
        'Comment 2',
        '2023-06-21 13:30:00',
        2,
        2
    ), (
        'Comment 3',
        '2023-06-21 14:45:00',
        3,
        1
    ), (
        'Comment 4',
        '2023-06-21 15:15:00',
        4,
        3
    ), (
        'Comment 5',
        '2023-06-21 12:45:00',
        3,
        5
    ), (
        'Comment 6',
        '2023-06-21 20:15:00',
        4,
        1
    ), (
        'Comment 7',
        '2023-06-23 20:15:00',
        4,
        2
    ), (
        'Comment 8',
        '2023-06-23 20:16:00',
        1,
        3
    ), (
        'Comment 9',
        '2023-06-23 20:16:10',
        1,
        2
    ), (
        'Comment 10',
        '2023-06-23 20:16:10',
        1,
        1
    ), (
        'Comment 11',
        '2023-06-23 20:16:30',
        2,
        1
    ), (
        'Comment 12',
        '2023-06-24 09:16:30',
        1,
        1
    );

-- LIKE

INSERT INTO
    `liked` (`date`, `idea_id`, `user_id`)
VALUES ('2023-06-21 12:00:00', 1, 1), ('2023-06-21 13:30:00', 2, 2), ('2023-06-21 14:45:11', 3, 1), ('2023-06-21 15:15:22', 4, 3), ('2023-06-21 12:00:35', 1, 2), ('2023-06-21 13:30:08', 2, 3), ('2023-06-21 14:45:50', 3, 6), ('2023-06-21 15:15:00', 4, 2), ('2023-06-21 12:00:02', 1, 3), ('2023-06-21 13:30:09', 2, 4), ('2023-06-21 14:45:30', 3, 5), ('2023-06-21 15:15:10', 4, 1);

--  CATEGORY

INSERT INTO
    `category` (
        `name`,
        `color_id`,
        `company_id`
    )
VALUES ('Category 1', 1, 1), ('Category 2', 2, 2), ('Category 3', 3, 3), ('Category 4', 4, 4), ('Category 5', 5, 5), ('Category 6', 6, 6), ('Recherche', 8, 3), ('Populaire', 15, 3), (
        'Planification des repas',
        3,
        3
    ), ('Partage de recettes', 9, 3), ('Astuces culinaires', 5, 3);

--  TAG

--  TAG HAS IDEA

--  TEAM HAS USER

INSERT INTO
    `team_has_user` (
        `team_id`,
        `user_id`,
        `joining_date`,
        `is_favorite_team`
    )
VALUES (1, 1, '2023-06-21 12:00:00', 1), (2, 2, '2023-06-21 13:30:00', 0), (3, 2, '2023-06-21 14:45:00', 1), (1, 4, '2023-06-21 15:15:00', 0);

--  CATEGORY HAS IDEA

INSERT INTO
    `category_has_idea` (`category_id`, `idea_id`)
VALUES (1, 1), (2, 2), (3, 1), (2, 4), (7, 5), (7, 12), (8, 8), (8, 10), (8, 6), (9, 7), (9, 14), (10, 8), (8, 9), (10, 11), (11, 13);

--  USER HAS COMPANY

INSERT INTO
    `user_has_company` (
        `user_id`,
        `company_id`,
        `biography`,
        `function`,
        `is_company_admin`
    )
VALUES (
        1,
        1,
        'Biography 1',
        'Function 1',
        1
    ), (
        2,
        2,
        'Biography 2',
        'Function 2',
        0
    ), (
        3,
        1,
        'Biography 3',
        'Function 3',
        1
    ), (
        4,
        3,
        '',
        'Fondateur de CookBuddy',
        0
    ), (
        5,
        4,
        'Biography 5',
        'Function 5',
        0
    );

--  WORKSPACE HAS USER

INSERT INTO
    `workspace_has_user` (
        `workspace_id`,
        `user_id`,
        `is_favorite_workspace`
    )
VALUES (1, 1, 1), (2, 2, 0), (3, 3, 1), (1, 4, 0);