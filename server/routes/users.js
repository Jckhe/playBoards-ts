const { Router } = require('express');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json([
        {
            username: 'Ky',
            age: 26
        },
        {
            username: 'Mike',
            age: 32
        }
    ])
})


module.exports = router;