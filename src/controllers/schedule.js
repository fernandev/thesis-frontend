const url = require('url');
const { connection } = require('./database');

const renderAppointmentsForm = async (req, res) => {
  const { especialidade, medico, action = 'schedule' } = req.query;

  if (!especialidade) {
    return fetchSpecialties().then(especialidades => (
      res.render('schedule', {
        especialidades,
        action
      })
    ));
  } else if (!medico) {
    return fetchDoctorsBySpecialty(especialidade).then(medicos => (
      res.render('schedule', {
        especialidade,
        medicos,
        action
      })
    ));
  } else {
    return res.render('schedule', {
      action
    });
  }
};

const handleAppointmentSchedule = async (req, res, next) => {
  const { especialidade, medico, paciente, data_consulta, convenio } = req.body;

  if ([especialidade, medico, paciente, data_consulta, convenio].every(param => (param))) {
    return scheduleAppointment({ especialidade, medico, paciente, data_consulta, convenio })
      .then(() => (
        res.redirect(url.format({
          pathname: '/schedule',
          query: {
            action: 'schedule_success'
          }
        }))
      ))
      .catch(() => (
        res.redirect(url.format({
          pathname: '/schedule',
          query: {
            action: 'schedule_failed'
          }
        }))
      ));
  } else {
    return res.redirect(url.format({
      pathname: '/schedule',
      query: {
        action: 'schedule',
        ...(especialidade) && { especialidade },
        ...(medico) && { medico },
        ...(paciente) && { paciente },
        ...(data_consulta) && { data_consulta },
        ...(convenio) && { convenio }
      }
    }));
  }
};

const fetchSpecialties = async () => (
  connection.query(`CALL list_especialidades`)
    .then(([rows]) => (
      rows.map(({ especialidade }) => (especialidade))
    ))
);

const fetchDoctorsBySpecialty = async specialty => (
  connection.query(`CALL list_medicos_from_especialidade(?)`, specialty)
    .then(([rows]) => (
      rows.map(({ nome }) => (nome))
    ))
);

const scheduleAppointment = async ({ especialidade, medico, paciente, data_consulta, convenio }) => (
  connection.query(`call create_consulta(?, ?, ?, ?, ?)`, [medico, especialidade, paciente, data_consulta, convenio])
);


module.exports = {
  renderAppointmentsForm,
  handleAppointmentSchedule
};
