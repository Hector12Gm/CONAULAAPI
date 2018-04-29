drop database conaula;
Create database conaula;

use conaula;
Create table usuarios(
	nombre_usuario char(50) primary key,
    password longtext not null,
    nombre char(50) not null,
    apellidos char(50) not null,
    img longtext not null
);

Create table grupos(
id_grupo char(50) primary key,
nombre char(50) not null ,
nombre_usuario char(50) not null,
foreign key (nombre_usuario) references usuarios(nombre_usuario)
);

Create table miembrosGrupo( 
id_miembro char(50) primary key,
nombre_usuario char(50) not null,
id_grupo char(50) not null,
foreign key  (nombre_usuario) references usuarios(nombre_usuario),
foreign key  (id_grupo) references grupos(id_grupo));
