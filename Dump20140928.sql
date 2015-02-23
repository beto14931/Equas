CREATE DATABASE  IF NOT EXISTS `tomasdb` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `tomasdb`;
-- MySQL dump 10.13  Distrib 5.6.13, for Win32 (x86)
--
-- Host: localhost    Database: tomasdb
-- ------------------------------------------------------
-- Server version	5.5.24-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ctr`
--

DROP TABLE IF EXISTS `ctr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ctr` (
  `ctrkeyi` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Clave control de operaciones',
  `ctrprjkeyi` int(11) DEFAULT NULL,
  `ctropec` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Nombre de la operacion',
  `ctrseci` int(11) DEFAULT NULL COMMENT 'Secuencia de ejecucion',
  `ctrsecprec` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Secuencias prerrequisitos',
  `ctrsecposc` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Secuencias post ejecutadas',
  `sysctrfecd` datetime NOT NULL,
  `sysctrvigi` int(11) NOT NULL DEFAULT '1',
  `sysctrusrc` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ctrkeyi`),
  KEY `ctrprj_idx` (`ctrprjkeyi`),
  CONSTRAINT `ctrprj` FOREIGN KEY (`ctrprjkeyi`) REFERENCES `prj` (`prjkeyi`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Control de operaciones';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ctr`
--

LOCK TABLES `ctr` WRITE;
/*!40000 ALTER TABLE `ctr` DISABLE KEYS */;
/*!40000 ALTER TABLE `ctr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dia`
--

DROP TABLE IF EXISTS `dia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dia` (
  `diakeyi` int(11) NOT NULL AUTO_INCREMENT,
  `diaprjkeyi` int(11) DEFAULT NULL,
  `diapro` date DEFAULT NULL COMMENT 'Dia de proceso',
  `dianxt` date DEFAULT NULL COMMENT 'Dia proximo proceso',
  `diavig` int(11) DEFAULT NULL COMMENT 'Dia vigente',
  `diactrkeyi` int(11) DEFAULT NULL COMMENT 'Clave de control de operaciones',
  `diaordi` int(11) DEFAULT NULL COMMENT 'Orden de ejecucion del dia',
  `dianrointi` int(11) DEFAULT NULL COMMENT 'Numero de intentos',
  `diasecinii` int(11) DEFAULT NULL COMMENT 'Segundo del dia en el que se inicio la ejecucion',
  `diasecfini` int(11) DEFAULT NULL COMMENT 'Segundo del dia en el que finalizo la ejecucion',
  `diactrestc` varchar(90) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Estado final de la ejecucion',
  `diactrmsgc` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Mensaje resultante de la ejecucion',
  `sysdiafecd` datetime NOT NULL,
  `sysdiavigi` int(11) NOT NULL DEFAULT '1',
  `sysdiausrc` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`diakeyi`),
  KEY `diactr_idx` (`diactrkeyi`),
  KEY `diaprj_idx` (`diaprjkeyi`),
  CONSTRAINT `diactr` FOREIGN KEY (`diactrkeyi`) REFERENCES `ctr` (`ctrkeyi`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `diaprj` FOREIGN KEY (`diaprjkeyi`) REFERENCES `prj` (`prjkeyi`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Control diario';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dia`
--

LOCK TABLES `dia` WRITE;
/*!40000 ALTER TABLE `dia` DISABLE KEYS */;
/*!40000 ALTER TABLE `dia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `glo`
--

DROP TABLE IF EXISTS `glo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `glo` (
  `glokeyi` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Clave del glosario',
  `glotabc` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `glocodc` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Codigo o nombre del parametro a guardar.',
  `glovalc` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Valor del parametro que se desea guardar.',
  `sysglofecd` datetime NOT NULL,
  `sysglovigi` int(11) NOT NULL DEFAULT '1',
  `sysglousrc` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`glokeyi`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `glo`
--

LOCK TABLES `glo` WRITE;
/*!40000 ALTER TABLE `glo` DISABLE KEYS */;
INSERT INTO `glo` VALUES (1,'TIPO_PROYECTO','Inventario de repuestos','Inventario de repuestos','0000-00-00 00:00:00',1,'randiel'),(2,'TIPO_PROYECTO','Inventario de materias primas','Inventario de materias primas','0000-00-00 00:00:00',1,'randiel'),(3,'UNIDAD_CONSOLIDAR','Producto','Producto','0000-00-00 00:00:00',1,'randiel'),(4,'UNIDAD_CONSOLIDAR','Ubicación','Ubicación','0000-00-00 00:00:00',1,'randiel'),(5,'UNIDAD_CONSOLIDAR','Operador','Operador','0000-00-00 00:00:00',1,'randiel'),(6,'TIPO_PROYECTO','Inventario de autos','Inventario de autos','0000-00-00 00:00:00',1,'randiel'),(7,'TIPO_PROYECTO','Producto terminado','Producto terminado','0000-00-00 00:00:00',1,'randiel');
/*!40000 ALTER TABLE `glo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lec`
--

DROP TABLE IF EXISTS `lec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lec` (
  `leckeyi` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Clave de la lectura',
  `lecprjkeyi` int(11) DEFAULT NULL COMMENT 'Clave del proyecto',
  `lecdiakeyi` int(11) DEFAULT NULL COMMENT 'Clave del dia de proceso',
  `lecstkkeyi` int(11) DEFAULT NULL COMMENT 'Clave del stock',
  `lecusrnamc` varchar(90) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Clave del usuario',
  `lecltrcodc` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Clave de la lectora',
  `leclstacci` int(11) DEFAULT NULL COMMENT 'Ultimo segundo de la ultima accion proveniente del usuario, lectora',
  `syslecfecd` datetime NOT NULL,
  `syslecvigi` int(11) NOT NULL DEFAULT '1',
  `syslecusrc` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`leckeyi`),
  KEY `lecprj_idx` (`lecprjkeyi`),
  KEY `lecdia_idx` (`lecdiakeyi`),
  KEY `lecstk_idx` (`lecstkkeyi`),
  CONSTRAINT `lecdia` FOREIGN KEY (`lecdiakeyi`) REFERENCES `dia` (`diakeyi`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `lecprj` FOREIGN KEY (`lecprjkeyi`) REFERENCES `prj` (`prjkeyi`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `lecstk` FOREIGN KEY (`lecstkkeyi`) REFERENCES `stk` (`stkkeyi`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Lecturas diarias';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lec`
--

LOCK TABLES `lec` WRITE;
/*!40000 ALTER TABLE `lec` DISABLE KEYS */;
/*!40000 ALTER TABLE `lec` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mwk`
--

DROP TABLE IF EXISTS `mwk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mwk` (
  `mwkkeyi` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Clave maestro de trabajo',
  `mwkprjkeyi` int(11) DEFAULT NULL,
  `mwkprokeyi` int(11) DEFAULT NULL COMMENT 'clave de producto',
  `mwkstkkeyi` int(11) DEFAULT NULL COMMENT 'clave de stock y ubicacion',
  `mwkvalkeyi` float DEFAULT NULL COMMENT 'clave de valorizacion',
  `mwkpruf` float DEFAULT NULL COMMENT 'precio unitario actualizado',
  `mwkcntf` float DEFAULT NULL COMMENT 'cantidad real recogida',
  `sysprofecd` datetime NOT NULL,
  `sysprovigi` int(11) NOT NULL DEFAULT '1',
  `sysprousrc` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`mwkkeyi`),
  KEY `mwkprj_idx` (`mwkprjkeyi`),
  CONSTRAINT `mwkprj` FOREIGN KEY (`mwkprjkeyi`) REFERENCES `prj` (`prjkeyi`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Maestro de trabajo';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mwk`
--

LOCK TABLES `mwk` WRITE;
/*!40000 ALTER TABLE `mwk` DISABLE KEYS */;
/*!40000 ALTER TABLE `mwk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prj`
--

DROP TABLE IF EXISTS `prj`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prj` (
  `prjkeyi` int(11) NOT NULL AUTO_INCREMENT,
  `prjnomc` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `prjtipc` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  `prjclikeyi` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `prjusrkeyi` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `prjfecinid` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `prjfecfind` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `prjcardatc` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `prjmodlecc` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `prjundconc` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sysprjfecd` datetime NOT NULL,
  `sysprjvigi` int(11) NOT NULL DEFAULT '1',
  `sysprjusrc` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`prjkeyi`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Proyectos de toma de inventario';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prj`
--

LOCK TABLES `prj` WRITE;
/*!40000 ALTER TABLE `prj` DISABLE KEYS */;
INSERT INTO `prj` VALUES (20,'201407 - CERAMICA SAN LORENZO S.A.C. - Producto terminado','Producto terminado','CERAMICA SA','Luis Bra','2014-09-25','2014-09-25',NULL,NULL,NULL,'2014-09-25 11:06:53',1,'admin'),(21,'201409 - MAQUINARIAS S.A. - Inventario de Autos','Inventario de autos','MAQUINARIAS','Rony Cam','2014-09-25','2014-09-25',NULL,NULL,NULL,'2014-09-25 11:07:44',1,'admin'),(22,'201407 - TOYOHATSU S.A. - Inventario de repuestos','Inventario de repuestos','TOYOHATSU S','Cindy Ca','2014-09-25','2014-09-25',NULL,NULL,NULL,'2014-09-25 11:08:34',1,'admin'),(23,'201408 - UNION DE CONCRETERAS S.A. - Inventario de repuestos','Inventario de repuestos','UNION DE CO','Gissela ','2014-09-25','2014-09-25',NULL,NULL,NULL,'2014-09-25 11:12:03',1,'admin'),(24,'201408 - PLUMAS E.I.R.L. - Inventario de materias primas','Inventario de materias primas','PLUMAS E.I.','Luis Bra','2014-09-25','2014-09-25',NULL,NULL,NULL,'2014-09-25 11:12:52',1,'admin');
/*!40000 ALTER TABLE `prj` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pro`
--

DROP TABLE IF EXISTS `pro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pro` (
  `prokeyi` int(11) NOT NULL AUTO_INCREMENT COMMENT 'clave primaria',
  `proprjkeyi` int(11) DEFAULT NULL,
  `procodc` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'codigo de producto',
  `proskuc` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'sku (stock keeping unit)',
  `prodesc` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'descripcion',
  `proundc` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'unidad de medida',
  `sysprofecd` datetime NOT NULL COMMENT 'fecha de registro',
  `sysprovigi` int(11) NOT NULL DEFAULT '1' COMMENT 'registro vigente',
  `sysprousrc` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`prokeyi`),
  KEY `proprj_idx` (`proprjkeyi`),
  CONSTRAINT `proprj` FOREIGN KEY (`proprjkeyi`) REFERENCES `prj` (`prjkeyi`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Maestro de productos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pro`
--

LOCK TABLES `pro` WRITE;
/*!40000 ALTER TABLE `pro` DISABLE KEYS */;
/*!40000 ALTER TABLE `pro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ssn`
--

DROP TABLE IF EXISTS `ssn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ssn` (
  `ssnkeyi` int(11) NOT NULL AUTO_INCREMENT,
  `ssnusrkeyi` int(11) DEFAULT NULL,
  `ssntknc` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sysssnfecd` datetime NOT NULL,
  `sysssnvigi` int(11) NOT NULL DEFAULT '1',
  `sysusrc` varchar(120) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ssnkeyi`),
  KEY `ssnusrasg_idx` (`ssnusrkeyi`),
  CONSTRAINT `ssnusrasg` FOREIGN KEY (`ssnusrkeyi`) REFERENCES `usr` (`usrkeyi`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Sesión de usuario';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ssn`
--

LOCK TABLES `ssn` WRITE;
/*!40000 ALTER TABLE `ssn` DISABLE KEYS */;
/*!40000 ALTER TABLE `ssn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stk`
--

DROP TABLE IF EXISTS `stk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stk` (
  `stkkeyi` int(11) NOT NULL AUTO_INCREMENT COMMENT 'campo clave.',
  `stkprjkeyi` int(11) DEFAULT NULL,
  `stkprokeyi` int(11) DEFAULT NULL COMMENT 'clave de producto',
  `stkubic` varchar(120) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'ubicacion',
  `stkfecd` datetime DEFAULT NULL COMMENT 'fecha proceso',
  `stkstkf` float DEFAULT NULL COMMENT 'stock - cantidad teorica',
  `stkpruf` float DEFAULT NULL COMMENT 'precio unitario',
  `sysstkfecd` datetime NOT NULL COMMENT 'fecha de registro',
  `sysstkvigi` int(11) NOT NULL DEFAULT '1' COMMENT 'registro vigente',
  `sysstkusrc` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`stkkeyi`),
  KEY `prostkasg_idx` (`stkprokeyi`),
  KEY `stkprj_idx` (`stkprjkeyi`),
  CONSTRAINT `prostkasg` FOREIGN KEY (`stkprokeyi`) REFERENCES `pro` (`prokeyi`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `stkprj` FOREIGN KEY (`stkprjkeyi`) REFERENCES `prj` (`prjkeyi`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Maestro de stock';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stk`
--

LOCK TABLES `stk` WRITE;
/*!40000 ALTER TABLE `stk` DISABLE KEYS */;
/*!40000 ALTER TABLE `stk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usr`
--

DROP TABLE IF EXISTS `usr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usr` (
  `usrkeyi` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Clave de usuario',
  `usrclikeyc` int(11) NOT NULL COMMENT 'Codigo cliente',
  `usrnomc` varchar(120) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Nombre de usuario',
  `usrapec` varchar(120) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Apellido de usuario',
  `usrnamc` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Nombre de usuario',
  `usrpssc` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Clave de usuario',
  `usroric` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Origen de usuario',
  `usrrolc` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Rol de usuario',
  `usrestc` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Estado de usuario',
  `sysusrfecd` datetime NOT NULL,
  `sysusrvigi` int(11) NOT NULL DEFAULT '1',
  `sysusrusrc` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`usrkeyi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Maestro de usuarios';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usr`
--

LOCK TABLES `usr` WRITE;
/*!40000 ALTER TABLE `usr` DISABLE KEYS */;
/*!40000 ALTER TABLE `usr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `val`
--

DROP TABLE IF EXISTS `val`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `val` (
  `valkeyi` int(11) NOT NULL AUTO_INCREMENT,
  `valprjkeyi` int(11) DEFAULT NULL,
  `valstkkeyi` int(11) DEFAULT NULL,
  `valvalf` float DEFAULT NULL,
  `valdifnetf` float DEFAULT NULL,
  `valdifabsf` float DEFAULT NULL,
  `sysvalfecd` datetime DEFAULT NULL,
  `sysvalvigi` int(11) DEFAULT '1',
  `sysvalusrc` varchar(120) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`valkeyi`),
  UNIQUE KEY `sysvalusrc_UNIQUE` (`sysvalusrc`),
  UNIQUE KEY `sysvalvigi_UNIQUE` (`sysvalvigi`),
  UNIQUE KEY `sysvalfecd_UNIQUE` (`sysvalfecd`),
  KEY `valstk_idx` (`valstkkeyi`),
  KEY `valprj_idx` (`valprjkeyi`),
  CONSTRAINT `valprj` FOREIGN KEY (`valprjkeyi`) REFERENCES `prj` (`prjkeyi`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `valstk` FOREIGN KEY (`valstkkeyi`) REFERENCES `stk` (`stkkeyi`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Maestro de valorizaciones';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `val`
--

LOCK TABLES `val` WRITE;
/*!40000 ALTER TABLE `val` DISABLE KEYS */;
/*!40000 ALTER TABLE `val` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tomasdb'
--
/*!50003 DROP PROCEDURE IF EXISTS `consultarGlosario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `consultarGlosario`(in p_tabla varchar(120), in p_codigo varchar(60))
BEGIN
	select glocodc, glovalc
	from glo
	where sysglovigi = 1
	and glotabc = TRIM(p_tabla)
    and glocodc like CONCAT('%',TRIM(p_codigo),'%');
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `consultarProyecto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `consultarProyecto`(in p_filtro varchar(60))
BEGIN
	DECLARE l_cntrow INT DEFAULT 0;

	select count(*) into l_cntrow
	from prj
	where sysprjvigi = 1
	and prjnomc like CONCAT('%', p_filtro, '%') COLLATE utf8_unicode_ci;

	if (l_cntrow>0) then
		select 	prjnomc as glocodc, 
				prjnomc as glovalc
		from prj
		where sysprjvigi = 1
		and prjnomc like CONCAT('%', p_filtro, '%') COLLATE utf8_unicode_ci;
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `consultarProyectos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `consultarProyectos`()
BEGIN
	select prjnomc, prjtipc from prj;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `guardarProyecto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `guardarProyecto`(	
										in p_nom varchar(250), 
										in p_tip varchar(60),
										in p_cli varchar(11),
										in p_res varchar(8),
										in p_fci varchar(10),
										in p_fcf varchar(10),
										in s_user varchar(60)
									)
BEGIN
	DECLARE l_prjkey INT DEFAULT 0;

	insert into prj (	prjnomc,
						prjtipc,
						prjclikeyi,
						prjusrkeyi,
						prjfecinid,
						prjfecfind,
						sysprjfecd,
						sysprjvigi,
						sysprjusrc
					) values (
						p_nom,
						p_tip,
						p_cli,
						p_res,
						p_fci,
						p_fcf,
						now(),
						1,
						s_user
					);
	
	commit;
	
	select 0 as result, 'Se ha registrado el proyecto.' as mensaje from dual;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-09-28 17:36:19
