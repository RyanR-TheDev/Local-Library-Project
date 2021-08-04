function getTotalBooksCount(books) {
  return books.length;
}


function getTotalAccountsCount(accounts) {
  return accounts.length;
}


function getBooksBorrowedCount(books) {
  let total = 0
  for (book of books) {
    for (borrowed of book.borrows) {
      if (borrowed.returned === false) {total++}
    }
  }
  return total
}

function getMostCommonGenres(books) {
  const count = books.reduce((acc, {genre}) => {
    if(acc[genre]) {
      acc[genre] += 1
    } else {
      acc[genre] = 1
    }
    return acc;
  }, {});
  const sortCount = _helperAuthor(count);
  return sortCount.map((name) => ({ name, count: count[name]})).slice(0,5);
}


function getMostPopularBooks(books) {
  const borrows = books.map(book => ({name:book.title, count:book.borrows.length}));
  borrows.sort((a,b) => b.count - a.count);
  return borrows.slice(0, 5);
}


function _helperAuthor(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if(obj[keyA]> obj[keyB]) {
      return -1;
    } else if(obj[keyB]> obj[keyA]) { 
      return 1;
    }
    return 0;
  })
}

function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }
    return acc;
  }, {});
  for (let id in count) {
    const sum = count[id].reduce((a, b) => a + b);
    count[id] = sum;
  }
  const sorted = _helperAuthor(count);
  return sorted
    .map((authorId) => {
      const {
        name: { first, last },
      } = authors.find(({ id }) => id === Number(authorId));
      const name = `${first} ${last}`;
      return { name, count: count[authorId] };
    })
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
