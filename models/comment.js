

  const comments = [
   {id: "0", bookId: "0", userEmail: "csuherma@pratt.edu", comment: "I would love to read this!!"},
   {id: "1", bookId: "0", userEmail: "csuherma@pratt.edu", comment: "OMG is just so good, i hope it stays this way"},
   {id: "2", bookId: "0", userEmail: "csuherma@pratt.edu", comment: "It's so sad that i finished it, what do you think?"},
   ];
   function getNextId() {
   return Math.max(...comments.map(c => c.id))+1;
   }
   exports.add = (comment) => {
   comment.id = getNextId();
   comments.push(comment);
   }
   exports.update = (comment) => {
   comments[comment.id] = comment;
   }
 exports.upsert = (comment) => {
   if (comment.id) {
   exports.update(comment);
   } else {
exports.add(comment);
   }
   }
exports.get = (id) => {
   return comments.find((comment) => {
   return comment.id == id;
   });
   }

exports.get = (idx) => {
  return comments[idx];
}

exports.AllForBook = (bookId) => {
   return comments.filter((comment) => {
      return comment.bookId == bookId;
   });
}
   