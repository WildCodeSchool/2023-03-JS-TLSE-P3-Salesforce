DROP DATABASE IF EXISTS `ideasforce`;

CREATE DATABASE `ideasforce`;

USE `ideasforce`;

-- -------------------------------------------------------
-- CREATING TABLES
-- -------------------------------------------------------
-- CREATING COLORS TABLE
DROP TABLE IF EXISTS `color`;

CREATE TABLE `color` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- CREATING USERS TABLE
DROP TABLE IF EXISTS `user`;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `phone_number` VARCHAR(22) NULL,
  `picture_url` VARCHAR(45) NULL,
  `is_salesforce_admin` TINYINT NOT NULL DEFAULT 0,
  `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `color_id` INT NULL,
  `has_accepted_invitation` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- CREATING COMPANY TABLE
DROP TABLE IF EXISTS `company`;

CREATE TABLE IF NOT EXISTS `company` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
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

CREATE TABLE IF NOT EXISTS `contract` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expiration_date` DATETIME NULL,
  `company_id` INT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- CREATING TEAM TABLE
DROP TABLE IF EXISTS `team`;

CREATE TABLE IF NOT EXISTS `team` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `creation_date` VARCHAR(45) NULL,
  `is_private` TINYINT NOT NULL DEFAULT 0,
  `picture_url` LONGTEXT NULL,
  `description` VARCHAR(255) NULL,
  `objective` VARCHAR(255) NULL,
  `status` VARCHAR(45) NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- CREATING WORKSPACE TABLE
DROP TABLE IF EXISTS `workspace`;

CREATE TABLE IF NOT EXISTS `workspace` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `creation_date` DATETIME NULL,
  `update_date` DATETIME NOT NULL,
  `description` VARCHAR(255) NULL,
  `is_private` TINYINT NOT NULL DEFAULT 0,
  `team_id` INT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- CREATING IDEAS GROUP TABLE
DROP TABLE IF EXISTS `ideas_group`;

CREATE TABLE IF NOT EXISTS `ideas_group` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `workspace_id` INT NOT NULL,
  `x_coordinate` INT NULL,
  `y_coordinate` INT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- CREATING IDEA TABLE
DROP TABLE IF EXISTS `idea`;

CREATE TABLE IF NOT EXISTS `idea` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `parent_idea_id` INT NULL,
  `creation_date` DATETIME NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` MEDIUMTEXT NULL,
  `status` VARCHAR(45) NOT NULL DEFAULT 'published',
  `x_coordinate` INT NULL,
  `y_coordinate` INT NULL,
  `color_id` INT NOT NULL,
  `company_id` INT NULL,
  `user_id` INT NOT NULL,
  `workspace_id` INT NOT NULL,
  `ideas_group_id` INT NULL,
  `team_id` INT NULL,
  `file_id` INT NULL,
  `is_in_board` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- CREATING FILE TABLE
DROP TABLE IF EXISTS `file`;

CREATE TABLE IF NOT EXISTS `file` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `import_date` DATETIME NOT NULL,
  `type` VARCHAR(45) NULL,
  `url` LONGTEXT NOT NULL,
  `idea_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- CREATING COMMENT TABLE
DROP TABLE IF EXISTS `comment`;

CREATE TABLE IF NOT EXISTS `comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` MEDIUMTEXT NULL,
  `creation_date` DATETIME NOT NULL,
  `idea_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- CREATING LIKE TABLE
DROP TABLE IF EXISTS `like`;

CREATE TABLE IF NOT EXISTS `like` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NULL,
  `idea_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- CREATING CATEGORY TABLE
DROP TABLE IF EXISTS `category`;

CREATE TABLE IF NOT EXISTS `category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `color_id` INT NOT NULL,
  `company_id` INT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- CREATING TAG TABLE
DROP TABLE IF EXISTS `tag`;

CREATE TABLE IF NOT EXISTS `tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- CREATING TAG HAS IDEA TABLE
DROP TABLE IF EXISTS `idea_has_tag`;

CREATE TABLE IF NOT EXISTS `idea_has_tag` (
  `tag_id` INT NOT NULL,
  `idea_id` INT NOT NULL
) ENGINE = InnoDB;

-- CREATING TEAM HAS USER TABLE
DROP TABLE IF EXISTS `team_has_user`;

CREATE TABLE IF NOT EXISTS `team_has_user` (
  `team_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `joining_date` DATETIME NULL,
  `is_favorite_team` TINYINT NOT NULL DEFAULT 0
) ENGINE = InnoDB;

-- CREATING CATEGORY HAS IDEA TABLE
DROP TABLE IF EXISTS `category_has_idea`;

CREATE TABLE IF NOT EXISTS `category_has_idea` (
  `category_id` INT NOT NULL,
  `idea_id` INT NOT NULL
) ENGINE = InnoDB;

-- CREATING USER HAS COMPANY TABLE
DROP TABLE IF EXISTS `user_has_company`;

CREATE TABLE IF NOT EXISTS `user_has_company` (
  `user_id` INT NOT NULL,
  `company_id` INT NOT NULL,
  `biography` LONGTEXT NULL,
  `function` VARCHAR(80) NOT NULL,
  `is_company_admin` TINYINT NOT NULL DEFAULT 0
) ENGINE = InnoDB;

-- CREATING WORKSPACE HAS USER TABLE
DROP TABLE IF EXISTS `workspace_has_user`;

CREATE TABLE IF NOT EXISTS `workspace_has_user` (
  `workspace_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `is_favorite_workspace` TINYINT NOT NULL DEFAULT 0
) ENGINE = InnoDB;

-- -------------------------------------------------------
-- CREATING FOREIGN KEYS
-- -------------------------------------------------------
-- USER
ALTER TABLE
  `user`
ADD
  CONSTRAINT `fk_user_color` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`);

-- COMPANY 
ALTER TABLE
  `company`
ADD
  CONSTRAINT `fk_company_color` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`);

-- CONTRACT 
ALTER TABLE
  `contract`
ADD
  CONSTRAINT `fk_contract_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`);

-- TEAM 
ALTER TABLE
  `team`
ADD
  CONSTRAINT `fk_team_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

-- WORKSPACE TEAM
ALTER TABLE
  `workspace`
ADD
  CONSTRAINT `fk_workspace_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`);

-- IDEA GROUP
ALTER TABLE
  `ideas_group`
ADD
  CONSTRAINT `fk_ideas_group_workspace` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`);

-- IDEA
ALTER TABLE
  `idea`
ADD
  CONSTRAINT `fk_idea_color` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`),
ADD
  CONSTRAINT `fk_idea_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
ADD
  CONSTRAINT `fk_idea_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
ADD
  CONSTRAINT `fk_idea_workspace` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`),
ADD
  CONSTRAINT `fk_idea_ideas_group` FOREIGN KEY (`ideas_group_id`) REFERENCES `ideas_group` (`id`),
ADD
  CONSTRAINT `fk_idea_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`),
ADD
  CONSTRAINT `fk_idea_file` FOREIGN KEY (`file_id`) REFERENCES `file` (`id`);

-- FILE
ALTER TABLE
  `file`
ADD
  CONSTRAINT `fk_file_idea` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`),
ADD
  CONSTRAINT `fk_file_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

-- COMMENT
ALTER TABLE
  `comment`
ADD
  CONSTRAINT `fk_comment_idea` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`),
ADD
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

-- LIKE
ALTER TABLE
  `like`
ADD
  CONSTRAINT `fk_like_idea` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`),
ADD
  CONSTRAINT `fk_like_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

-- CATEGORY
ALTER TABLE
  `category`
ADD
  CONSTRAINT `fk_category_color` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`),
ADD
  CONSTRAINT `fk_category_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`);

-- IDEA HAS TAG
ALTER TABLE
  `idea_has_tag`
ADD
  CONSTRAINT `fk_idea_has_tag_tag` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`),
ADD
  CONSTRAINT `fk_idea_has_tag_idea` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`);

-- TEAM HAS USER
ALTER TABLE
  `team_has_user`
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
  CONSTRAINT `fk_category_has_idea_idea` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`);

-- USER HAS COMPANY
ALTER TABLE
  `user_has_company`
ADD
  CONSTRAINT `fk_user_has_company_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
ADD
  CONSTRAINT `fk_user_has_company_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`);

-- WORKSPACE HAS USER
ALTER TABLE
  `workspace_has_user`
ADD
  CONSTRAINT `fk_workspace_has_user_workspace` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`),
ADD
  CONSTRAINT `fk_workspace_has_user_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

-- -------------------------------------------------------
-- ADDING CONTENT
-- -------------------------------------------------------
-- COLORS
INSERT INTO
  `color` (`name`)
VALUES
  ("rose"),
  ("pink"),
  ("fuchsia"),
  ("purple"),
  ("violet"),
  ("indigo"),
  ("blue"),
  ("sky"),
  ("cyan"),
  ("teal"),
  ("emerald"),
  ("green"),
  ("lime"),
  ("yellow"),
  ("amber"),
  ("orange"),
  ("red");

