# ************************************************************
# Sequel Ace SQL dump
# 版本号： 20046
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# 主机: 127.0.0.1 (MySQL 5.7.28)
# 数据库: theflowers_cc
# 生成时间: 2023-03-12 13:10:00 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# 转储表 article
# ------------------------------------------------------------

DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text,
  `cover_img` varchar(255) DEFAULT NULL,
  `pub_date` varchar(255) DEFAULT NULL,
  `author_id` varchar(255) DEFAULT NULL,
  `cate_id` varchar(255) DEFAULT NULL,
  `id_del` tinyint(1) NOT NULL,
  `cate_idCopy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# 转储表 article_cate
# ------------------------------------------------------------

DROP TABLE IF EXISTS `article_cate`;

CREATE TABLE `article_cate` (
  `id` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(255) DEFAULT NULL,
  `alias` char(255) DEFAULT NULL,
  `is_del` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `article_cate` WRITE;
/*!40000 ALTER TABLE `article_cate` DISABLE KEYS */;

INSERT INTO `article_cate` (`id`, `name`, `alias`, `is_del`)
VALUES
	(1,'历史','history',0),
	(2,'英语','english',0),
	(3,'数学','math',0),
	(4,'化学','chemistry',0),
	(5,'abcd','abcd',1),
	(6,NULL,NULL,0);

/*!40000 ALTER TABLE `article_cate` ENABLE KEYS */;
UNLOCK TABLES;


# 转储表 users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `nickname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `user_pic` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `username`, `password`, `status`, `nickname`, `email`, `user_pic`)
VALUES
	(1,'wuxiangjun','5555',0,NULL,NULL,NULL),
	(2,'wuyan','5555',0,NULL,NULL,NULL),
	(3,'wuyitong','5555',0,NULL,NULL,NULL),
	(13,'wumeitu','$2a$10$AchWMhQnqhOnkLpQmPmQgOcHcBno85YWLYxUMXf1BVJNqW9tkknd.',0,NULL,NULL,NULL),
	(14,'wuqingda','$2a$10$AVpudSi2rd9W2xKPvZab3OaRe7.NsOy7IaHmiKy0BBfRNmDXeKA/m',0,NULL,NULL,NULL),
	(15,'wuqingda2','$2a$10$.p/9SHyKf6f6/YRy4r/0Ju3gwwFrtdK6TLV9G2Lg9U.KSSGg2M6F.',0,NULL,NULL,NULL),
	(16,'wuqingda3','$2a$10$0Oj/1ZvM9/OYnY.B6LA2reOCZB4B6ATaUlC2NEu/qgZwJgH3ZgFsi',0,NULL,NULL,NULL),
	(17,'admin','$2a$10$AsLuXKTREGIzSIIiq0dsWeF3smFI3ruYyJCnAEPp.p8sVuQZzd47K',0,'crazybull','626066708@qq.com','data:image/vnd.microsoft.icon;base64,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');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
