const express = require('express');
const port = 3000;
const app = express();

app.route('/api/spaghetti-plates').get((req, res) => {
    return res.json([
        {
            spaghettiId: 1,
            spaghettiName: 'Spaghetti',
            spaghettiDescription: 'Spaghetti in marinara sauce and fresh parmesan cheese',
            spaghettiPrice: 1099,
            spaghettiPopularity: 8,
            spaghettiEnabled: true
        },
        {
            spaghettiId: 2,
            spaghettiName: 'Spaghetti and Meatballs ',
            spaghettiDescription: 'Spaghetti in marinara sauce, fresh parmesan cheese and three A quality beef meatballs',
            spaghettiPrice: 1299,
            spaghettiPopularity: 10,
            spaghettiEnabled: true
        },
        {
            spaghettiId: 3,
            spaghettiName: 'Baked Spaghetti',
            spaghettiDescription: 'Spaghetti in marinara sauce, top with mozzarella cheese and baked to perfection',
            spaghettiPrice: 1199,
            spaghettiPopularity: 7,
            spaghettiEnabled: true
        },
        {
            spaghettiId: 4,
            spaghettiName: 'Spaghetti a la Carbonara',
            spaghettiDescription: 'Spaghetti in carbonara sauce with fresh parmesan cheese and capers',
            spaghettiPrice: 1599,
            spaghettiPopularity: 9,
            spaghettiEnabled: true
        },
        {
            spaghettiId: 5,
            spaghettiName: 'Zucchini Spaghetti',
            spaghettiDescription: 'Zucchini spaghetti in marinara sauce and fresh parmesan cheese',
            spaghettiPrice: 1099,
            spaghettiPopularity: 6,
            spaghettiEnabled: true
        },
    ]);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
