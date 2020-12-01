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
tipo int,
foreign key  (nombre_usuario) references usuarios(nombre_usuario),
foreign key  (id_grupo) references grupos(id_grupo));

Create table PublicacionesGrupo(
id_publicacion char(50) primary key ,
titulo text,
enunciado text,
rutaArchivo text,
nombreArchivo text,
tipo int,
id_miembro char(50) not null,
fecha datetime,
foreign key (id_miembro) references miembrosgrupo(id_miembro)
);
use conaula;
#drop procedure GetPublicacionesGrupo;
create procedure GetPublicacionesGrupo(id char(50))
Select publicacionesgrupo.id_publicacion,publicacionesgrupo.nombreArchivo,publicacionesgrupo.rutaArchivo,publicacionesgrupo.fecha,
publicacionesgrupo.rutaArchivo,publicacionesgrupo.tipo,publicacionesgrupo.titulo,
publicacionesgrupo.enunciado,usuarios.nombre,usuarios.nombre_usuario,usuarios.img,
usuarios.apellidos from publicacionesgrupo inner join miembrosgrupo on miembrosgrupo.id_miembro=
publicacionesgrupo.id_miembro inner join usuarios on
 usuarios.nombre_usuario=miembrosgrupo.nombre_usuario 
inner join grupos on miembrosgrupo.id_grupo=grupos.id_grupo 
where grupos.id_grupo=id 
order by publicacionesgrupo.fecha desc;


Create table recursosGrupo(
id_recurso char(50) primary key,
id_grupo char(50) not null,
nombreArchivo text not null,
rutaArchivo text not null,
foreign key (id_grupo) references grupos(id_grupo)
);

use conaula;
#drop table tareas;
Create table tareas
(
	id_tarea char(50) primary key,
    id_grupo char(50),
	titulo text,
    rutaArchivo text,
    nombreArchivo text,
    fechaLimite datetime,
    tipo int,
    enunciado text,
    foreign key (id_grupo) references grupos(id_grupo)
);



use conaula;
#drop table entregaTareas;

Create table entregaTareas(
id_entrega char(50) primary key,
id_tarea char(50),
id_miembro char(50),
titulo text,
enunciado text,
nombreArchivo text,
rutaArchivo text,
tipo int,
foreign key (id_tarea) references tareas(id_tarea),
foreign key (id_miembro) references miembrosgrupo(id_miembro)
);


Create table Examenes(
id_examen char(50) primary key,
id_grupo char(50) not null,
titulo text,
fecha datetime,
foreign key (id_grupo) references grupos(id_grupo)
);

#drop table examanes;
use conaula;
CREATE TABLE PreguntasExamen(
    id_pregunta char(50) primary key,
    enunciado char(100),
    respuestaC char(100),
    respuestaI1 char(100),
    respuestaI2 char(100),
    id_examen char(50),FOREIGN KEY (id_examen) REFERENCES Examenes(id_examen)
    );

Create table CalificacionesExamen(
    id_calificacion char(50) PRIMARY KEY,
    calificacion int ,
    id_examen char(50),
    FOREIGN KEY (id_examen) REFERENCES Examenes(id_examen),
    id_miembro char(50),
    FOREIGN KEY (id_miembro) REFERENCES miembrosgrupo(id_miembro));


use conaula;
Create procedure getEntregas(id char(50))
Select entregatareas.id_entrega,entregatareas.titulo,
entregatareas.enunciado,entregatareas.nombreArchivo,entregatareas.rutaArchivo,
usuarios.nombre_usuario,usuarios.nombre,usuarios.apellidos,usuarios.img,
entregatareas.tipo from 
entregatareas inner join miembrosgrupo on miembrosgrupo.id_miembro=entregaTareas.id_miembro
inner join usuarios on usuarios.nombre_usuario=miembrosgrupo.nombre_usuario where 
entregatareas.id_tarea=id;

drop procedure getCalificaciones;
Create  PROCEDURE getCalificaciones(id char(50))
   	select usuarios.nombre,usuarios.nombre_usuario,usuarios.apellidos,calificacionesexamen.calificacion from 
    calificacionesexamen inner join miembrosgrupo on miembrosgrupo.id_miembro=calificacionesexamen.id_miembro
    inner join usuarios on usuarios.nombre_usuario=miembrosgrupo.nombre_usuario where
    calificacionesexamen.id_examen=id;





use conaula;
Create procedure getResumen(id char(50))
Select count(calificacion) as count, calificacionesexamen.calificacion from calificacionesexamen 
where id_examen=id
group by calificacion ;


Select entregatareas.id_entrega,entregatareas.titulo,
entregatareas.enunciado,entregatareas.nombreArchivo,entregatareas.rutaArchivo,
usuarios.nombre_usuario,usuarios.nombre,usuarios.apellidos,usuarios.img from 
entregatareas inner join miembrosgrupo on miembrosgrupo.id_miembro=entregaTareas.id_miembro
inner join usuarios on usuarios.nombre_usuario=miembrosgrupo.nombre_usuario where 
entregatareas.id_tarea="91evoD5hqTALZrcsCIq8ykJ8VZ2nnfObKlkiyFp6v1h76leavv"