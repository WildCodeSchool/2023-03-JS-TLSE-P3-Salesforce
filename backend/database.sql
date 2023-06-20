DROP DATABASE IF EXISTS `ideasforce`;

CREATE DATABASE `ideasforce`;

USE `ideasforce`;

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
  `creation_date` DATETIME NOT NULL,
  `color_id` INT NULL,
  `has_accepted_invitation` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_color` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `creation_date` DATETIME NOT NULL,
  `color_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_company_color` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`)
) ENGINE = InnoDB;

-- CREATING CONTRACT TABLE
DROP TABLE IF EXISTS `contract`;

CREATE TABLE IF NOT EXISTS `contract` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `creation_date` DATETIME NOT NULL,
  `expiration_date` DATETIME NULL,
  `company_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_contract_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
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
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_team_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
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
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_workspace_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`)
) ENGINE = InnoDB;

-- CREATING IDEAS GROUP TABLE
DROP TABLE IF EXISTS `ideas_group`;

CREATE TABLE IF NOT EXISTS `ideas_group` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `workspace_id` INT NOT NULL,
  `x_coordinate` INT NULL,
  `y_coordinate` INT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_ideas_group_workspace` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`)
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
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_idea_color` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`),
  CONSTRAINT `fk_idea_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `fk_idea_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_idea_workspace` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`),
  CONSTRAINT `fk_idea_ideas_group` FOREIGN KEY (`ideas_group_id`) REFERENCES `ideas_group` (`id`),
  CONSTRAINT `fk_idea_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`),
  CONSTRAINT `fk_idea_file` FOREIGN KEY (`file_id`) REFERENCES `file` (`id`)
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
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_file_idea` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`),
  CONSTRAINT `fk_file_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB;

-- CREATING COMMENT TABLE
DROP TABLE IF EXISTS `comment`;

CREATE TABLE IF NOT EXISTS `comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` MEDIUMTEXT NULL,
  `creation_date` DATETIME NOT NULL,
  `idea_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_comment_idea` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`) ON DELETE,
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE
) ENGINE = InnoDB;

-- CREATING LIKE TABLE
DROP TABLE IF EXISTS `like`;

CREATE TABLE IF NOT EXISTS `like` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NULL,
  `idea_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_like_idea` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`) ON DELETE,
  CONSTRAINT `fk_like_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE
) ENGINE = InnoDB;

-- CREATING CATEGORY TABLE
DROP TABLE IF EXISTS `category`;

CREATE TABLE IF NOT EXISTS `category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `color_id` INT NOT NULL,
  `company_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_category_color` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`),
  CONSTRAINT `fk_category_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE = InnoDB;

-- CREATING TAG TABLE
DROP TABLE IF EXISTS `tag`;

CREATE TABLE IF NOT EXISTS `tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- CREATING TAG HAS IDEA TABLE
DROP TABLE IF EXISTS `tag_has_idea`;

CREATE TABLE IF NOT EXISTS `tag_has_idea` (
  `tag_id` INT NOT NULL,
  `idea_id` INT NOT NULL,
  CONSTRAINT `fk_tag_has_idea_tag` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`),
  CONSTRAINT `fk_tag_has_idea_idea` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`)
) ENGINE = InnoDB;

-- CREATING TEAM HAS USER TABLE
DROP TABLE IF EXISTS `team_has_user`;

CREATE TABLE IF NOT EXISTS `team_has_user` (
  `team_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `joining_date` DATETIME NULL,
  `is_favorite_team` TINYINT NOT NULL DEFAULT 0,
  CONSTRAINT `fk_team_has_user_team` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`),
  CONSTRAINT `fk_team_has_user_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB;

-- CREATING CATEGORY HAS IDEA TABLE
DROP TABLE IF EXISTS `category_has_idea`;

CREATE TABLE IF NOT EXISTS `category_has_idea` (
  `category_id` INT NOT NULL,
  `idea_id` INT NOT NULL,
  CONSTRAINT `fk_category_has_idea_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_category_has_idea_idea` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`)
) ENGINE = InnoDB;

-- CREATING USER HAS COMPANY TABLE
DROP TABLE IF EXISTS `user_has_company`;

CREATE TABLE IF NOT EXISTS `user_has_company` (
  `user_id` INT NOT NULL,
  `company_id` INT NOT NULL,
  `biography` LONGTEXT NULL,
  `function` VARCHAR(80) NOT NULL,
  `is_company_admin` TINYINT NOT NULL DEFAULT 0,
  CONSTRAINT `fk_user_has_company_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_user_has_company_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
) ENGINE = InnoDB;

-- CREATING USER HAS FAVORITE WORKSPACE TABLE
DROP TABLE IF EXISTS `user_has_favorite_workspace`;

CREATE TABLE IF NOT EXISTS `user_has_favorite_workspace` (
  `workspace_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`workspace_id`, `user_id`),
  CONSTRAINT `fk_workspace_has_user_workspace` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`),
  CONSTRAINT `fk_workspace_has_user_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB;

-- CREATING WORKSPACE HAS USER TABLE
DROP TABLE IF EXISTS `workspace_has_user`;

CREATE TABLE IF NOT EXISTS `workspace_has_user` (
  `workspace_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  CONSTRAINT `fk_workspace_has_user_workspace1` FOREIGN KEY (`workspace_id`) REFERENCES `workspace` (`id`),
  CONSTRAINT `fk_workspace_has_user_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB;