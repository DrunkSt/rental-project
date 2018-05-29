-- phpMyAdmin SQL Dump
-- version 2.8.0.1
-- http://www.phpmyadmin.net
-- 
-- Host: custsql-ipg124.eigbox.net
-- Generation Time: Mar 31, 2017 at 12:39 PM
-- Server version: 5.6.32
-- PHP Version: 4.4.9
-- 
-- Database: `demo_estate`
-- 
-- CREATE DATABASE `demo_estate` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
-- USE `demo_estate`;

-- --------------------------------------------------------

-- 
-- Table structure for table `agents`
-- 

CREATE TABLE `agents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(300) NOT NULL,
  `name` varchar(300) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tel` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

-- 
-- Dumping data for table `agents`
-- 


-- --------------------------------------------------------

-- 
-- Table structure for table `categories`
-- 

CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(200) NOT NULL,
  `icon` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

-- 
-- Dumping data for table `categories`
-- 


-- --------------------------------------------------------

-- 
-- Table structure for table `energy_efficiency`
-- 

CREATE TABLE `energy_efficiency` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

-- 
-- Dumping data for table `energy_efficiency`
-- 

INSERT INTO `energy_efficiency` VALUES (1, 'A+');
INSERT INTO `energy_efficiency` VALUES (4, 'A++');

-- --------------------------------------------------------

-- 
-- Table structure for table `preferences`
-- 

CREATE TABLE `preferences` (
  `name` varchar(50) NOT NULL,
  `value` mediumtext NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 
-- Dumping data for table `preferences`
-- 

INSERT INTO `preferences` VALUES ('info', '<p>Put any information in HTML format, Youtube videos or images here.</p>');

-- --------------------------------------------------------

-- 
-- Table structure for table `properties`
-- 

CREATE TABLE `properties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'unnamed',
  `category` varchar(100) COLLATE utf8_bin NOT NULL,
  `image` varchar(1000) CHARACTER SET latin1 NOT NULL,
  `shared` int(10) unsigned NOT NULL DEFAULT '0',
  `viewed` int(10) unsigned NOT NULL DEFAULT '0',
  `favorited` int(10) unsigned NOT NULL DEFAULT '0',
  `accepted` tinyint(1) NOT NULL DEFAULT '1',
  `address` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `gpslat` float(10,6) NOT NULL,
  `gpslng` float(10,6) NOT NULL,
  `lastupdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `featured` int(11) NOT NULL DEFAULT '0',
  `description` varchar(2000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `type` int(5) NOT NULL,
  `status` int(2) NOT NULL,
  `county` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `zipcode` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `area` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `energy` int(5) NOT NULL,
  `bathrooms` int(5) NOT NULL,
  `bedrooms` int(5) NOT NULL,
  `rooms` int(10) NOT NULL,
  `saleprice` int(100) NOT NULL,
  `rentprice` int(100) NOT NULL,
  `yearbuilt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ownername` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tel` varchar(100) COLLATE utf8_bin NOT NULL,
  `email` varchar(200) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=12 ;

-- 
-- Dumping data for table `properties`
-- 


-- --------------------------------------------------------

-- 
-- Table structure for table `properties_categories`
-- 

CREATE TABLE `properties_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `property_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=latin1 AUTO_INCREMENT=80 ;

-- 
-- Dumping data for table `properties_categories`
-- 


-- --------------------------------------------------------

-- 
-- Table structure for table `property_status`
-- 

CREATE TABLE `property_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

-- 
-- Dumping data for table `property_status`
-- 

INSERT INTO `property_status` VALUES (2, 'To Rent');
INSERT INTO `property_status` VALUES (3, 'To Sell');

-- --------------------------------------------------------

-- 
-- Table structure for table `property_types`
-- 

CREATE TABLE `property_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

-- 
-- Dumping data for table `property_types`
-- 

INSERT INTO `property_types` VALUES (2, 'Apartment');
INSERT INTO `property_types` VALUES (4, 'Town House');

-- --------------------------------------------------------

-- 
-- Table structure for table `pushnotifications`
-- 

CREATE TABLE `pushnotifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- 
-- Dumping data for table `pushnotifications`
-- 


-- --------------------------------------------------------

-- 
-- Table structure for table `users`
-- 

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

-- 
-- Dumping data for table `users`
-- 

INSERT INTO `users` VALUES (1, 'admin', '$2y$10$3wI/pWmcTW7iHqW6zXSdv.uQjo3M6275p3byIp4g.ztlka4CIFuty');
