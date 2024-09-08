SET IDENTITY_INSERT dbo.Users ON;

IF(NOT EXISTS(SELECT * FROM dbo.Users WHERE id = 1)) BEGIN
	INSERT dbo.Users(id, name) VALUES (1, 'test-user');
END

SET IDENTITY_INSERT dbo.Users OFF;

SELECT * FROM dbo.Users
