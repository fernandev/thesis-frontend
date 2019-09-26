const { connection } = require('./database');

const renderAppointments = async (req, res) => (
  fetchAppointments().then(agendamentos => (
    res.render('list', {
      agendamentos
    })
  )).catch(() => (
    res.render('list')
  ))
);

const fetchAppointments = async () => (
  connection.query(`CALL list_consultas`)
    .then(([rows]) => (
      rows.map(({ medico, especialidade, paciente, data, convenio }) => ({
        medico, especialidade, paciente, data, convenio
      }))
    ))
);

module.exports = {
  renderAppointments
};
