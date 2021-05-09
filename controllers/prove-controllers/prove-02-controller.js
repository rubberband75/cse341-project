// Array for storing books sent to the server
const books = [
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        summary: 'Published in 1960, this timeless classic explores human behaviour and the collective conscience of The Deep South in the early 20th century. Humour entwines the delicate strands of prejudice, hatred, hypocrisy, love and innocence to create one of the best novels ever written.',
        coverImage: 'https://cdn.lifehack.org/wp-content/uploads/2015/03/50-anniversary-cover1.jpg'
    },
    {
        title: '1984',
        author: 'George Orwell',
        summary: 'Although 1984 has passed us by, George Orwell’s dystopian, totalitarian world of control, fear and lies has never been more relevant. Delve into the life of Winston Smith as he struggles with his developing human nature in a world where individuality, freewill and love are forbidden.',
        coverImage: 'https://cdn.lifehack.org/wp-content/uploads/2015/03/1984.jpg'
    },
    {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        summary: 'Published in 1925, Fitzgerald’s The Great Gatsby explores the decadence of the Jazz Age, and one man’s introduction into a world where even those with the most indulgent lives cannot earn love.',
        coverImage: 'https://cdn.lifehack.org/wp-content/uploads/2015/03/Penguin-2.jpg'
    },
]

exports.getIndex = (req, res, next) => {
    res.render('prove-views/prove-02/', {
        title: 'Prove 02',
        path: '/prove/02',
        books: books
    });
}

exports.addBook = (req, res, next) => {
    let { title, author, summary, coverImage } = req.body;
    books.push({ title, author, summary, coverImage })
    res.redirect('/prove/02/')
}

exports.removeBook = (req, res, next) => {
    let { index } = req.body;
    books.splice(index, 1)
    res.redirect('/prove/02/')
}