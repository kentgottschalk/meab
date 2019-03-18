/* drops schema to start from blank */
DROP SCHEMA IF EXISTS armydata CASCADE;

/* creates schema */
CREATE SCHEMA armydata;

/* create new datatype */
create type armydata.faction_side as enum (
  ''good'',
  ''evil''
);

/* creates faction */
CREATE TABLE armydata.faction (
  fid serial primary key,
  name text not null,
  side armydata.faction_side
);

/* faction table descriptions */
comment on table armydata.faction is 'Factions in Middle Earth from Lord of the Rings';
comment on column armydata.faction.name is 'Name of the Factions';
comment on column armydata.faction.side is ''good' vs. 'evil' as an enum type';

/* create new datatype */
create type armydata.faction_relation_type as enum (
  'historical',
  'convenient',
  'impossible'
);

/* create relations between factions */
CREATE TABLE armydata.faction_relation (
  faction_relation_id SERIAL PRIMARY KEY,
  faction1_id INT REFERENCES armydata.faction (fid) ON DELETE CASCADE,
  faction2_id INT REFERENCES armydata.faction (fid) ON DELETE CASCADE,
  relation armydata.faction_relation_type
  CHECK (faction1_id < faction2_id)
);

/* faction relation table descriptions */
comment on table armydata.faction_relation is 'Many to many relation table';

/* create new datatype */
create type armydata.unit_type as enum (
  'hero',
  'warrior'
);

/* create hero type table */
CREATE TABLE armydata.heroic_tier (
  hid serial primary key, 
  name text,
  warriors int
);

/* unit data */
CREATE TABLE armydata.unit (
  uid serial primary key,
  name text NOT NULL,
  unit_type armydata.unit_type,
  heroic_tier INTEGER REFERENCES armydata.heroic_tier(hid),
  points int
);

/* create relations between unit and factions */
CREATE TABLE armydata.unit_faction_relation (
  unit_faction_relation_id SERIAL PRIMARY KEY,
  unit_id INT REFERENCES armydata.unit (uid) ON DELETE CASCADE,
  faction_id INT REFERENCES armydata.faction (fid) ON DELETE CASCADE
  /* CHECK (faction1_id < faction2_id) */
);

/* option table */
CREATE TABLE armydata.option (
  oid serial primary key,
  name text not null,
  unique_option BOOLEAN,
  point_hero int,
  point_warrior int
);

/* create relations between unit and options */
CREATE TABLE armydata.unit_option_relation (
  unit_option_relation_id SERIAL PRIMARY KEY,
  unit_id INT REFERENCES armydata.unit (uid) ON DELETE CASCADE,
  option_id INT REFERENCES armydata.option (oid) ON DELETE CASCADE
  /* CHECK (faction1_id < faction2_id) */
);

/* insert faction data */
INSERT INTO armydata.faction (fid, name, side) VALUES 
(1,'The Fellowship','good'),
(2,'The Shire','good'),
(3,'The Rangers','good'),
(4,'Numenor','good'),
(5,'Minas Tirith','good'),
(6,'The Fiefdoms','good'),
(7,'The Dead of Dunharrow','good'),
(8,'Arnor','good'),
(9,'Rohan','good'),
(10,'Rivendell','good'),
(11,'Lothlorien','good'),
(12,'Fangorn','good'),
(13,'The Misty Mountains','good'),
(14,'The Kingdom of Khazad-Dum','good'),
(15,'Wanderers in the Wild','good'),
(16,'Erebor Reclaimed','good'),
(17,'The Army of Lake-town','good'),
(18,'Thranduil´s Halls','good'),
(19,'Thorin´s Company','good'),
(20,'The Survivor´s of Lake-town','good'),
(21,'Radagast´s Alliance','good'),
(22,'Garrison of Dale','good'),
(23,'Azog´s Hunters','evil'),
(24,'Azog´s Legion','evil'),
(25,'The Dark Denizens of Mirkwood','evil'),
(26,'Goblin Town','evil'),
(27,'Dark Powers of Dol Guldor','evil'),
(28,'Desolator of the North','evil'),
(29,'The Trolls','evil'),
(30,'Barad-Dur','evil'),
(31,'Angmar','evil'),
(32,'Mordor','evil'),
(33,'Moria','evil'),
(34,'Isengard','evil'),
(35,'The Easterlings','evil'),
(36,'Variags of Khand','evil'),
(37,'The Serpent Horde','evil'),
(38,'Far Harad','evil'),
(39,'Corsairs of Umbar','evil'),
(40,'Sharfid´s Rogues','evil');

/* insert hero_type data */
INSERT INTO armydata.heroic_tier (hid, name, warriors) VALUES 
(1,'Hero of Legend',18),
(2,'Hero of Valour',15),
(3,'Hero of Fortitude',12),
(4,'Minor Hero',8),
(5,'Independent Hero',0)

/* insert unit data */
INSERT INTO armydata.unit (uid, name, unit_type, heroic_tier, points) VALUES 
(1,'Mahüd King','hero',3,70),
(2,'Mahüd Tribesmaster','hero',3,50),
(3,'War Mümak of Far Harad','hero',5,300),
(4,'Warriors of Far Harad','warrior',NULL,8)

/* insert option data */
INSERT INTO armydata.option (oid, name, unique_option, point_hero, point_warrior) VALUES 
(1,'Shield',false,5,1),
(2,'Horse',false,5,1),
(3,'Bow',false,5,1),
(4,'Boromirs Banner',true,35,NULL)

/* insert faction relation data */
INSERT INTO armydata.faction_relation (faction_relation_id, faction1_id,faction2_id, relation) VALUES 
(1,1,2,'historical'),
(2,1,3,'historical'),
(3,1,4,'historical'),
(4,1,5,'convenient'),
(5,1,6,'impossible')

/* insert unit faction relation data */
INSERT INTO armydata.unit_faction_relation (unit_faction_relation_id, unit_id, faction_id) VALUES 
(1,1,1),
(2,2,1),
(3,3,1),
(4,3,2)

/* insert unit option relation data */
INSERT INTO armydata.unit_option_relation (unit_option_relation_id, unit_id, option_id) VALUES 
(1,1,1),
(2,1,2),
(3,1,3),
(4,2,1),
(5,2,2),
(6,3,1)
