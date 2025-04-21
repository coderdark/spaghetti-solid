const express = require('express');
const port = 3000;
const app = express();

app.route('/api/spaghetti-plates').get((req, res) => {
    return res.json([
        {id: 1, name: 'Spaghetti', description: 'Spaghetti in marinara sauce and fresh parmesan cheese', price: 1099},
        {
            id: 2,
            name: 'Spaghetti and Meatballs ',
            description: 'Spaghetti in marinara sauce, fresh parmesan cheese and three A quality beef meatballs',
            price: 1299
        },
        {
            id: 3,
            name: 'Baked Spaghetti',
            description: 'Spaghetti in marinara sauce, top with mozzarella cheese and baked to perfection',
            price: 1199
        },
        {
            id: 4,
            name: 'Spaghetti a la Carbonara',
            description: 'Spaghetti in carbonara sauce with fresh parmesan cheese and capers',
            price: 1599
        },
        {
            id: 5,
            name: 'Zucchini Spaghetti',
            description: 'Zucchini spaghetti in marinara sauce and fresh parmesan cheese',
            price: 1099
        },
    ]);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
