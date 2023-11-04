CREATE TABLE [Producto]
(
 [Codigo] Int IDENTITY(1,1) NOT NULL,
 [Nombre] Varchar(64) NOT NULL,
 [Precio] Integer NOT NULL,
 [Existencia] Varchar(64) NOT NULL,
)
go

ALTER TABLE [Producto] ADD CONSTRAINT [PK_Codigo] PRIMARY KEY ([Codigo])
go