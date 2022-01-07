let books = [
    {
        ISBN: "123One",
        title: "Getting started with MERN",
        authors: [1,2],
        language: "en",
        pubDate: "2021-07-07",
        numOfPage: 225,
        category: ["fiction","programming","tech","web dev"],
        publication: 1
    },
    {
        ISBN: "12345Two",
        title: "Getting started with PYTHON",
        authors: [1,2],
        language: "en",
        pubDate: "2021-08-07",
        numOfPage: 550,
        category: ["fiction","tech","web dev"],
        publication: 1
    }
];

let authors = [
    {
        id: 1,
        name: "Jack",
        books: ["12345ONE", "12345TWO"]
    },
    {
        id: 2,
        name: "Joe",
        books: ["12345ONE", "12345TWO"]
    }
];

let publications = [
    {
        id: 1,
        name: "ABC Publications",
        books: ["123One", "123Three"]
    },
    {
        id: 2,
        name: "PQR Publications",
        books: []
    }
];

module.exports = {books, authors, publications};
