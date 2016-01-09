
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 01/09/2016 02:08:32
-- Generated from EDMX file: C:\Users\ludichrislyts\Desktop\Aaron\PortlandiaMonopoly\SaveMonopoly\Models\Database.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [Database];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_GameGame_Player]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Game_Player] DROP CONSTRAINT [FK_GameGame_Player];
GO
IF OBJECT_ID(N'[dbo].[FK_PlayerGame_Player]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Game_Player] DROP CONSTRAINT [FK_PlayerGame_Player];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Games]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Games];
GO
IF OBJECT_ID(N'[dbo].[Players]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Players];
GO
IF OBJECT_ID(N'[dbo].[Game_Player]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Game_Player];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Games'
CREATE TABLE [dbo].[Games] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [json] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'Players'
CREATE TABLE [dbo].[Players] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [name] nvarchar(max)  NOT NULL,
    [password] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'Game_Player'
CREATE TABLE [dbo].[Game_Player] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Game_Id] int  NOT NULL,
    [Player_Id] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Games'
ALTER TABLE [dbo].[Games]
ADD CONSTRAINT [PK_Games]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Players'
ALTER TABLE [dbo].[Players]
ADD CONSTRAINT [PK_Players]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Game_Player'
ALTER TABLE [dbo].[Game_Player]
ADD CONSTRAINT [PK_Game_Player]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [Game_Id] in table 'Game_Player'
ALTER TABLE [dbo].[Game_Player]
ADD CONSTRAINT [FK_GameGame_Player]
    FOREIGN KEY ([Game_Id])
    REFERENCES [dbo].[Games]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_GameGame_Player'
CREATE INDEX [IX_FK_GameGame_Player]
ON [dbo].[Game_Player]
    ([Game_Id]);
GO

-- Creating foreign key on [Player_Id] in table 'Game_Player'
ALTER TABLE [dbo].[Game_Player]
ADD CONSTRAINT [FK_PlayerGame_Player]
    FOREIGN KEY ([Player_Id])
    REFERENCES [dbo].[Players]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_PlayerGame_Player'
CREATE INDEX [IX_FK_PlayerGame_Player]
ON [dbo].[Game_Player]
    ([Player_Id]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------