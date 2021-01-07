if exists (select * from master.dbo.sysdatabases where name = 'Movies')
BEGIN
  USE master;
  DROP DATABASE Movies;
END
go

CREATE DATABASE Movies;
go

use Movies
GO


IF EXISTS (SELECT * FROM movies.dbo.sysusers WHERE name = 'MovieProvider')
BEGIN
  DROP USER [MovieProvider];
END
GO

CREATE USER [MovieProvider] FOR LOGIN [MovieProvider];

IF EXISTS (SELECT * FROM movies.dbo.sysusers WHERE name = 'MovieManager')
BEGIN
  DROP USER [MovieManager];
END
GO

CREATE USER [MovieManager] FOR LOGIN [MovieManager];
GO

if not exists (select * from sysobjects where name='movies' and xtype='U')
BEGIN
  create table movies(
    id int primary key,
    title nvarchar(100),
    [length] int CHECK ([length] > 0 AND [length] < 180),
    [year] int,
    director nvarchar(100),
    genreId int
  )
END
go

if not exists (select * from sysobjects where name='actors' and xtype='U')
BEGIN
  create table actors(
    id int primary key,
    [name] nvarchar(100),
    initials nvarchar(10)
  )
END
go

if not exists (select * from sysobjects where name='genres' and xtype='U')
BEGIN
  create table genres(
    id int primary key,
    genre nvarchar(100),
    [description] nvarchar(100)
  )
END
go

if not exists (select * from sysobjects where name='actorMovie' and xtype='U')
BEGIN
  create table actorMovie(
    actorId int foreign key references actors (id),
    movieId int foreign key references movies (id)
    primary key (actorId, movieId)
  )
END
go

ALTER TABLE movies
ADD FOREIGN KEY (genreId) references genres(id)

-- SELECT * FROM movies WHERE [year] = (SELECT TOP (1) [year] from movies ORDER BY [year] ASC);

ALTER ROLE [db_datawriter] ADD MEMBER [MovieProvider]
GRANT INSERT ON OBJECT::dbo.movies TO MovieProvider

ALTER ROLE [db_datawriter] ADD MEMBER [MovieManager]

GO

use master;