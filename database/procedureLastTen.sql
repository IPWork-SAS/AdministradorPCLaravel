USE ipfiadmin;
DROP PROCEDURE IF EXISTS dataLastTen;
DELIMITER //
CREATE PROCEDURE dataLastTen (IN nameDatabase VARCHAR(30), idLocation INT)
BEGIN
 	drop table IF exists nameCampaings;
	create temporary table nameCampaings(
        id int auto_increment primary key,
        campania varchar(100),
		nombre varchar(100)
    ); 
	 SET @querytop = CONCAT('
	        insert into nameCampaings (campania, nombre) select campania, nombre from ',nameDatabase,'.campania as e where e.id_locacion =',idLocation
	    ); 
	PREPARE campaingsTable FROM @querytop;
   execute campaingsTable;
   
   SET @countCampaings = (select count(*) from nameCampaings);
   set @countPrimary = 1;
   set @queryTotal = "";
   
   drop table IF exists dataLastTen;
		create temporary table dataLastTen(
		  id int auto_increment primary key,
		  nombre varchar(100),
		  apellidos varchar(100),
		  fecha_creacion VARCHAR(100),
		  ip varchar(100),
		  nombreCampania VARCHAR(100),
		  tablaCampania VARCHAR(100),
		  idUsuario int
		);
		
	while @countPrimary <= @countCampaings do
	set @queryNameTables = (select campania from nameCampaings where id=@countPrimary);
	set @queryNameCampaing = (select nombre from nameCampaings where id=@countPrimary); 

	drop table IF exists nameColumns;
	set @queryCampains = concat ('
		create temporary table nameColumns (
			select column_name from information_schema.columns where table_schema = "',nameDataBase,'"and table_name = "',@queryNameTables,'"
		)'
	);
	prepare campains from @queryCampains;
	execute campains;

	set @existe = (select exists (select * from nameColumns t where t.column_name = 'nombre'));
		if @existe = 1 then
			SET @queryTableLastTen = CONCAT('
			insert into dataLastTen (nombre,apellidos,fecha_creacion,ip,nombreCampania,tablaCampania,idUsuario) select nombre, apellidos, fecha_creacion, ip_cliente,','"',@queryNameCampaing,'"',' AS nombreCampania,','"',@queryNameTables,'"',' as tablaCampania, id as idUsuario  from ',nameDatabase,'.',@queryNameTables
		);
		PREPARE campaings FROM @queryTableLastTen;
		execute campaings;
	end if;
	
   	Set @countPrimary = @countPrimary+1;
   end while;

   SELECT @i := @i + 1 as posTop, nombre AS Nombres, apellidos AS Apellidos, fecha_creacion AS 'Fecha_Registro', ip AS IP, nombreCampania AS 'Campaña', tablaCampania, idUsuario FROM dataLastTen cross join (select @i := 0) d order by fecha_creacion desc LIMIT 10;
END//
DELIMITER ;