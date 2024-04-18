INSERT INTO authors (first_name, last_name) VALUES ('Bifo', 'Berardi');
INSERT INTO authors (first_name, last_name) VALUES ('Norbert', 'Wiener');
INSERT INTO authors (first_name, last_name) VALUES ('Tiziana', 'Terranova');

INSERT INTO genres (name) VALUES ('Theory');
INSERT INTO genres (name) VALUES ('Philosophy');
INSERT INTO genres (name) VALUES ('Manifesto');
--command EE to run it
-- add the "title" for the values
INSERT INTO books (title, genre_id, publishing_year) VALUES ('After the Internet: Digital Networks between Capital and the Common', 1, 2022);
INSERT INTO books (title, genre_id, publishing_year) VALUES ('The Uprising: On Poetry and Finance', 3, 2012);
INSERT INTO books (title, genre_id, publishing_year) VALUES ('Cybernetics: Or Control and Communication in the Animal and the Machine', 2, 1948);

INSERT INTO authors_books (author_id, book_id) VALUES (3, 1 );
INSERT INTO authors_books  (author_id, book_id) VALUES (2, 3 );
INSERT INTO authors_books (author_id, book_id) VALUES (1, 2 );

select * from authors_books;






