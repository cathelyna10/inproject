const genres = [
    {genreName: "Theory"},
    {genreName: "Philosophy"},
    {genreName: "Manifesto"},
  ]
  //the req body, were going to give it a name aka genre
  // array?
 
  exports.upsert = (genre) => {
    if (genre.id) {
      exports.update(genre);
    } else {
      exports.add(genre);
    }
  }
  
  exports.update = (genre) => {
    genres[genre.id] = genre;
  }
  

  //the req body, were going to give it a name aka genre
  // array?

  exports.all = genres

  exports.get = (idx) => {
    return genres[idx];
  }
  
  exports.add = (genre) => {
    genres.push(genre);
  }
  


  