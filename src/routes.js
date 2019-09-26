const router = require('express').Router();

const { renderAppointments } = require('./controllers/list');
const { renderAppointmentsForm, scheduleAppointment } = require('./controllers/schedule')

router.get('/', (req, res) => { res.render('home'); });

router.get('/list', renderAppointments);

router.route('/schedule')
  .get(renderAppointmentsForm)
  .post(scheduleAppointment);

module.exports = router;