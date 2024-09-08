-- =========================================
-- Create table dbo.Users
-- =========================================
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
	DROP TABLE dbo.Users
GO

CREATE TABLE dbo.Users (
	id INT NOT NULL IDENTITY(1, 1) NOT FOR REPLICATION
	, CONSTRAINT PK_Users_id PRIMARY KEY CLUSTERED (id)
	, name VARCHAR(100) NOT NULL
	, balance NUMERIC(25,2) NOT NULL CONSTRAINT DF_Users_Balance DEFAULT 0
	)
GO
