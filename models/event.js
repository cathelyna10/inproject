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
  SELECT e.id, e.event_name, e.event_year, c.country_name, ua.action_name, ua.action_description, i.individual_name, i.individual_role 
FROM 
  event e 
  JOIN event_country ec ON e.id = ec.event_id
  JOIN country c ON ec.country_id = c.id
  JOIN us_action ua ON e.us_action_id = ua.id
  LEFT JOIN individual_event ie ON e.id = ie.event_id  -- Changed to LEFT JOIN
  LEFT JOIN individual i ON ie.individual_id = i.id    -- Changed to LEFT JOIN
WHERE 
  e.id = $1;
  `, [eventId]); 
  return db.camelize(rows);
};


exports.allForEvent = async (eventId) => {
  try {
    const { rows } = await db.getPool().query(`
      SELECT e.id, e.event_name, e.event_year, c.country_name, ua.action_name, ua.action_description, i.individual_name, i.individual_role 
      FROM event e 
      JOIN event_country ec ON e.id = ec.event_id
      JOIN country c ON ec.country_id = c.id
      JOIN us_action ua ON e.us_action_id = ua.id
      LEFT JOIN individual_event ie ON e.id = ie.event_id
      LEFT JOIN individual i ON ie.individual_id = i.id
      WHERE e.id = $1;
    `, [eventId]); 

    if (!rows.length) return null; // No event found

    // Combine data into one object if multiple rows are returned due to multiple countries
    const event = {
      id: rows[0].id,
      eventName: rows[0].eventName,
      eventYear: rows[0].eventYear,
      actionName: rows[0].actionName,
      actionDescription: rows[0].actionDescription,
      countries: [],
      individuals: []
    };

    // Extract unique countries and individuals
    const countrySet = new Set();
    const individualSet = new Set();

    rows.forEach(row => {
      if (row.countryName && !countrySet.has(row.countryName)) {
        countrySet.add(row.countryName);
        event.countries.push({ name: row.countryName });
      }
      if (row.individualName && !individualSet.has(row.individualName)) {
        individualSet.add(row.individualName);
        event.individuals.push({
          name: row.individualName,
          role: row.individualRole
        });
      }
    });

    return db.camelize(event);
  } catch (error) {
    console.error('Failed to retrieve event details:', error);
    throw error; // Propagate the error
  }
};

 /*
      //await addAuthorsToBook(newBook, book.authorIds)
    //return newBook
      
   return db.getPool()
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
