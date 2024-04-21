drop database if exists us_intervention;

create database us_intervention;

\c us_intervention
 
CREATE TABLE "us_action" (
  "ID" serial,
  "us_action" varchar,
  "action_description" varchar,
  PRIMARY KEY ("ID")
);

CREATE TABLE "country" (
  "ID" serial,
  "country_name" varchar,
  "country_id" int,
  PRIMARY KEY ("ID")
);

CREATE TABLE "individuals" (
  "ID" serial,
  "individual_name" varchar,
  "individual_role" varchar,
  "individual_id" int,
  PRIMARY KEY ("ID")
);

CREATE TABLE "event" (
  "ID" serial,
  "event_year" int,
  "event_name" varchar, 
  "event_id" int, 
  PRIMARY KEY ("ID")
);

CREATE TABLE "individuals_event" (
  "ID" serial,
  "event_id" int, 
  "individual_id" int,
  PRIMARY KEY ("ID")
);

CREATE TABLE "event_country" (
  "ID" serial,
  "event_id" int,
  "country_id" int,
  PRIMARY KEY ("ID")
);
