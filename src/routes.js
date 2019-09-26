const router = require('express').Router();

const { renderAppointments } = require('./controllers/list');
const { renderAppointmentsForm, handleAppointmentSchedule } = require('./controllers/schedule')

router.get('/', (req, res) => { res.render('home'); });

router.get('/list', renderAppointments);

router.route('/schedule')
  .get(renderAppointmentsForm)
  .post(handleAppointmentSchedule);

module.exports = router;