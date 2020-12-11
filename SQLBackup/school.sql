use master
go

IF EXISTS 
   (
     SELECT name FROM master.dbo.sysDATABASEs 
    WHERE name = 'School'
    )
BEGIN
    SELECT 'DATABASE Name already Exist' AS Message
END
ELSE
BEGIN
    CREATE DATABASE [School]
	ON PRIMARY (
		NAME='Primary',
		FILENAME=
		   'C:\Primary\primary.mdf',
		SIZE=4MB,
		MAXSIZE=10MB,
		FILEGROWTH=1MB
	),
	FILEGROUP ElevGroup (
		NAME = elevFile,
		FILENAME = 'C:\Elev\elev.ndf',
		SIZE = 5MB,
		MAXSIZE = 100MB,
		FILEGROWTH = 5MB
	),
	FILEGROUP TeacherGroup (
		NAME = teacherFile,
		FILENAME = 'C:\Teacher\teacher.ndf',
		SIZE = 5MB,
		MAXSIZE = 100MB,
		FILEGROWTH = 5MB
	),
	FILEGROUP classGroup (
		NAME = classFile,
		FILENAME = 'C:\class\class.ndf',
		SIZE = 5MB,
		MAXSIZE = 100MB,
		FILEGROWTH = 5MB
	),
	FILEGROUP PostNrGroup (
		NAME = postNrFil,
		FILENAME = 'C:\PostNr\postnr.ndf',
		SIZE = 5MB,
		MAXSIZE = 100MB,
		FILEGROWTH = 5MB
	) 
    SELECT 'Created DATABASE' AS Message
END
go

use [School]
  go

IF NOT EXISTS (select * from sysobjects where name='Elev' and xtype='U')
  CREATE TABLE Elev(
    ElevID int primary key,
    firstname nvarchar(100),
    lastname nvarchar(100),
    [address] nvarchar(100)
  ) ON Elevgroup;
go

IF NOT EXISTS (select * from sysobjects where name='teacher' and xtype='U')
  CREATE TABLE teacher(
    teacherID int primary key,
    firstname nvarchar(100),
    lastname nvarchar(100),
    [address] nvarchar(100)
  ) ON Teachergroup;
go

IF NOT EXISTS (select * from sysobjects where name='postNr' and xtype='U')
  CREATE TABLE postNr(
    postnr int,
    byNavn nvarchar(100)
  ) ON PostNrgroup;
go

IF NOT EXISTS (select * from sysobjects where name='class' and xtype='U')
  CREATE TABLE class(
    classID int primary key,
    classNavn nvarchar(100)
  ) ON classgroup;
go

IF NOT EXISTS (select * from sysobjects where name='tutor' and xtype='U')
  CREATE TABLE tutor(
    teacherID int foreign key references teacher (teacherID),
    classID int foreign key references class (classID)
  )
GO

-- Allow users with Rollback backup
ALTER DATABASE [School]
SET MULTI_USER
WITH ROLLBACK IMMEDIATE
GO

-- Backup 
declare @loc nvarchar(200) = 'C:\bak\'
declare @client nvarchar(50) = 'CLIENT001_'
declare @date nvarchar(50) = '2020-02-29'

declare @pathStr nvarchar(500) = @loc + @client + 'DB1_' + CAST(CAST( GETDATE() AS DATE) AS NVARCHAR) + '.BAK'

BACKUP DATABASE [School]
TO DISK = @pathStr with compression, init, checksum, stop_on_error
GO

ALTER DATABASE [School]
SET RECOVERY full