function findAccountById(accounts, id) {
  return accounts.find(account => {
    return account.id === id;
    });
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  const { id: accId } = account;
  return books.reduce((accumulator, book) => {
    return (
      accumulator +
      book.borrows
        .filter(borrow => borrow.id === accId)
        .reduce((accumulatorBorrows, borrow) => accumulatorBorrows + 1, 0)
    );
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = [];
  books.forEach((book) => {
    let bookBorrows = book.borrows;
    bookBorrows.forEach((borrow) => {
      if (borrow.id === account.id && !borrow.returned) {
        borrowedBooks.push(book);
      }
    });
  });
  let result = borrowedBooks.map((book) => {
    return { ...book, author: _getAuthor(book, authors) };
  });
  return result;
}

function _getAuthor(book, authors) {
  const author = authors.find((author) => author.id === book.authorId);
  return author;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
