USE [GenSecurOTP]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 10/08/2023 16:12:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CodesOtp]    Script Date: 10/08/2023 16:12:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CodesOtp](
	[IDOTP] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](max) NOT NULL,
	[DateGen] [datetime2](7) NOT NULL,
	[DateExp] [datetime2](7) NOT NULL,
	[Username] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_CodesOtp] PRIMARY KEY CLUSTERED 
(
	[IDOTP] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CodesSecurite]    Script Date: 10/08/2023 16:12:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CodesSecurite](
	[IDCS] [int] IDENTITY(1,1) NOT NULL,
	[CodeSec] [nvarchar](max) NOT NULL,
	[DateGen] [datetime2](7) NOT NULL,
	[Username] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_CodesSecurite] PRIMARY KEY CLUSTERED 
(
	[IDCS] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 10/08/2023 16:12:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Username] [nvarchar](450) NOT NULL,
	[Nom] [nvarchar](max) NOT NULL,
	[Prenom] [nvarchar](max) NOT NULL,
	[GSM] [nvarchar](max) NOT NULL,
	[IdF] [nvarchar](max) NOT NULL,
	[MotDePasse] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[CodesOtp]  WITH CHECK ADD  CONSTRAINT [FK_CodesOtp_Users_Username] FOREIGN KEY([Username])
REFERENCES [dbo].[Users] ([Username])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CodesOtp] CHECK CONSTRAINT [FK_CodesOtp_Users_Username]
GO
ALTER TABLE [dbo].[CodesSecurite]  WITH CHECK ADD  CONSTRAINT [FK_CodesSecurite_Users_Username] FOREIGN KEY([Username])
REFERENCES [dbo].[Users] ([Username])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CodesSecurite] CHECK CONSTRAINT [FK_CodesSecurite_Users_Username]
GO
