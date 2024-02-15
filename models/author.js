const authors = [
    {firstName: "Tiziana", lastName: "Terranova"},
    {firstName: "Bifo", lastName: "Berardi"},
    {firstName: "Norbert", lastName: "Weiner"},
  ]
  //the req body, were going to give it a name aka author
  // array?

  exports.all = authors

  exports.add = (author) => {
    authors.push(author);
  }
  

  