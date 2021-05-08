//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();

const Item = require('../models/ta03/Item')

router.get('/', (req, res, next) => {

    if (req.query.tag) {
        Item.getItemsByTag(req.query.tag, items => {
            res.render('pages/ta03', {
                title: 'Team Activity 03',
                path: '/ta03',
                items: items,
                tag: req.query.tag
            });
        })

    } else {
        Item.getAllItems(items => {
            res.render('pages/ta03', {
                title: 'Team Activity 03',
                path: '/ta03',
                items: items,
                tag: null
            });
        })
    }


});


module.exports = router;