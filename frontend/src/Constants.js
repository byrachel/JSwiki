const production = {
    url: {
        HEROKU_URL: 'https://jswikitech.herokuapp.com'
    }
};

const local = {
    url: {
        HEROKU_URL: 'http://localhost:8080'
    }
}

export const config = process.env.NODE_ENV === 'development' ? local : production;