const books = [
    {bookName: "After the Internet: Digital Networks between Capital and the Common,",publishingYear: 2022},
    {bookName: "The Uprising: On Poetry and Finance,",publishingYear: 2012},
    {bookName: "Cybernetics: Or Control and Communication in the Animal and the Machine,",publishingYear: 1948},
  ]
  //the req body, were going to give it a name aka author
  // array?

 
  exports.update = (book) => {
    books[book.id] = book;
  }
  exports.upsert = (book) => {
    if (book.id) {
      exports.update(book);
    } else {
      exports.add(book);
    }
  }
  
  exports.all = books

  exports.get = (idx) => {
    return books[idx];
  }
  
  exports.add = (book) => {
    books.push(book);
  }
  

  