﻿USE [master]
GO

--To create database, please replace <FILLIN-DB-PATH> with the folder name


CREATE DATABASE [kolikosoft-test]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'kolikosoft-test', FILENAME = N'<FILLIN-DB-PATH>\kolikosoft-test.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'kolikosoft-test_log', FILENAME = N'<FILLIN-DB-PATH>\kolikosoft-test_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [kolikosoft-test].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [kolikosoft-test] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [kolikosoft-test] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [kolikosoft-test] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [kolikosoft-test] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [kolikosoft-test] SET ARITHABORT OFF 
GO

ALTER DATABASE [kolikosoft-test] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [kolikosoft-test] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [kolikosoft-test] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [kolikosoft-test] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [kolikosoft-test] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [kolikosoft-test] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [kolikosoft-test] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [kolikosoft-test] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [kolikosoft-test] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [kolikosoft-test] SET  DISABLE_BROKER 
GO

ALTER DATABASE [kolikosoft-test] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [kolikosoft-test] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [kolikosoft-test] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [kolikosoft-test] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [kolikosoft-test] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [kolikosoft-test] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [kolikosoft-test] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [kolikosoft-test] SET RECOVERY FULL 
GO

ALTER DATABASE [kolikosoft-test] SET  MULTI_USER 
GO

ALTER DATABASE [kolikosoft-test] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [kolikosoft-test] SET DB_CHAINING OFF 
GO

ALTER DATABASE [kolikosoft-test] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [kolikosoft-test] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO

ALTER DATABASE [kolikosoft-test] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [kolikosoft-test] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO

ALTER DATABASE [kolikosoft-test] SET QUERY_STORE = OFF
GO

ALTER DATABASE [kolikosoft-test] SET  READ_WRITE 
GO


