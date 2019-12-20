var app = {
    user:'sa',
    password:'pass@word2',
    server:'42.51.32.132',
    port:'19394',    
    database:'zjyyj',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    },
    pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 3000
    }
};

module.exports = app;