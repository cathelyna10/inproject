drop database if exists my_first_db;

create database my_first_db;

\c my_first_db

create table "users" (
  "id" serial,
  "email" varchar,
  "name" varchar,
  "password" varchar,
  "salt" varchar,
  primary key ("id")
);

create table "genres" (
  "id" serial,
  "name" varchar,
  primary key ("id")
);

create table "books" (
  "id" serial,
  "title" varchar,
  "publishing_year" int,
  "genre_id" int,
  primary key ("id")
);

create table "authors" (
  "id" serial,
  "first_name" varchar,
  "last_name" varchar,
  primary key ("id")
);

create table "authors_books" (
  "id" serial,
  "author_id" int,
  "book_id" int,
  primary key ("id")
);

create table "book_user" (
  "id" serial,
  "user_id" int,
  "book_id" int,
  "reading status" varchar,
  primary key ("id")
);

create table "comment" (
  "id" serial,
  "user_id" int,
  "book_id" int,
  "text" varchar,
  primary key ("id")
);

