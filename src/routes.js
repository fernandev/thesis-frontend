const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/list', (req, res) => {
  res.render('list');
});

router.get('/schedule', (req, res) => {
  res.render('schedule');
});

module.exports = router;