drop database if exists us_intervention;

create database us_intervention;

\c us_intervention
 
CREATE TABLE "us_action" (
  "id" serial,
  "action_name" varchar,
  "action_description" varchar,
  PRIMARY KEY ("id")
);

CREATE TABLE "country" (
  "id" serial,
  "country_name" varchar,
  PRIMARY KEY ("id")
);

CREATE TABLE "individual" (
  "id" serial,
  "individual_name" varchar,
  "individual_role" varchar,
  PRIMARY KEY ("id")
);

CREATE TABLE "event" (
  "id" serial,
  "event_year" int,
  "event_name" varchar, 
  "us_action_id" int,
  PRIMARY KEY ("id")
);

CREATE TABLE "individual_event" (
  "id" serial,
  "event_id" int, 
  "individual_id" int,
  PRIMARY KEY ("id")
);

CREATE TABLE "event_country" (
  "id" serial,
  "event_id" int,
  "country_id" int,
  PRIMARY KEY ("id")
);
