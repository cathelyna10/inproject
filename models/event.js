const db = require('../database');

exports.all = async () => {
  const { rows } = await db.getPool().query("SELECT * FROM event ORDER BY id");
  return db.camelize(rows);
};

exports.get = async (id) => {
  const { rows } = await db.getPool().query("SELECT * FROM event WHERE id = $1", [id]);
  return db.camelize(rows)[0];
};

exports.allForEvent = async (eventId) => {
  const { rows } = await db.getPool().query(`
    SELECT event.*,
      us_action.id AS usActionId,
      us_action.name AS usActionName,
      us_action.description AS usActionDescription,
      country.id AS countryId,
      country.country_name AS countryNameFROM event 
    JOIN us_action ON event.us_action_id = us_action.id
    WHERE event.id = $1;

    
  `, [eventId]); 
  return db.camelize(rows);
};







      //await addAuthorsToBook(newBook, book.authorIds)
    //return newBook
      
    /*return db.getPool()
    exports.add = async (event) => {
      const { rows } = await db.getPool()
  
        .query("INSERT INTO book(title, publishing_year, genre_id) VALUES($1, $2, $3) RETURNING *",
          [event.eventName, event.eventYear, event.eventId]);
      let newEvent = db.camelize(rows)[0]
      
  
    }*/

  /*const books = [
    {bookName: "After the Internet: Digital Networks between Capital and the Common,",publishingYear: 2022, authorIds: ["0","1"]},
    {bookName: "The Uprising: On Poetry and Finance,",publishingYear: 2012},
    {bookName: "Cybernetics: Or Control and Communication in the Animal and the Machine,",publishingYear: 1948},
  ]*/
  //the req body, were going to give it a name aka author
  // array?
    /*
    
    exports.update = async (event) => {
    const { rows } = await db.getPool()
      .query("UPDATE books SET title = $1, publishing_year = $2, genre_id = $3 where id = $4 RETURNING *",
        [book.title, book.publishingYear, book.genreId, book.id]);
    let newBook = db.camelize(rows)[0]
  await DeleteAuthorsForBook(newBook) // By first deleting the relevant authors_books records, we prevent accidental duplicates
  await addAuthorsToBook(newBook, book.authorIds)
  return newBook

  }

  
  const addAuthorsToBook = async (book, authorIds) => {
    authorIds.forEach(async (authorId) => {
      await db.getPool().query(`
        INSERT INTO authors_books(author_id, book_id) values($1,$2)
        `,[authorId,book.id])
    })
  }
  const DeleteAuthorsForBook = async (book) => {
    db.getPool().query(`DELETE from authors_books where book_id = $1`, [book.id]);
  }

  exports.upsert = async (book) => {
    if (book.authorIds && ! Array.isArray(book.authorIds)) {
      book.authorIds = [book.authorIds];
    }
    if (book.id) {
      return exports.update(book);
    } else {
      return exports.add(book);
    }
  }
  */



/*

  exports.update = (book) => {
    books[book.id] = book;
  }
  exports.upsert = (book) => {
    if (book.authorIds && ! Array.isArray(book.authorIds)) {
      book.authorIds = [book.authorIds];
    }
    if (book.id) {
      exports.update(book);
    } else {
      exports.add(book);
    }
  }
  
  

  exports.get = (idx) => {
    return books[idx];
  }
  
  exports.add = (book) => {
    books.push(book);
  }

exports.all = books*/
