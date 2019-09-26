const url = require('url');

const renderAppointmentsForm = async (req, res) => {
  const { especialidade, medico, action = 'schedule' } = req.query;

  if (!especialidade) {
    const especialidades = await new Promise(resolve => {
      setTimeout(() => {
        resolve(["Acupuntura","Angiologia","Cardiologia","Pediatra","Clínica Geral","Gastroentereologia","Dermatologia","Geriatria","Ginecologia","Obstetrícia","Nutricionista","Neurologista","Psiquiatra"]);
      }, 0000);
    });

    return res.render('schedule', {
      especialidades,
      action
    });
  } else if (!medico) {
    const medicos = await new Promise(resolve => {
      setTimeout(() => {
        resolve(["Jose Camargo Lacerda", "Ana Tereza de A. Vasques"]);
      }, 0000);
    });

    return res.render('schedule', {
      especialidade,
      medicos,
      action
    });
  } else {
    return res.render('schedule', {
      action
    });
  }
};

const scheduleAppointment = async (req, res, next) => {
  const { especialidade, medico, paciente, data_consulta, convenio } = req.body;

  if ([especialidade, medico, paciente, data_consulta, convenio].every(param => (param))) {
    try {
      return res.redirect(url.format({
        pathname: '/schedule',
        query: {
          action: 'schedule_success'
        }
      }));
    } catch(err) {
      console.error(err);
      return res.redirect(url.format({
        pathname: '/schedule',
        query: {
          action: 'schedule_failed'
        }
      }));
    }
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

module.exports = {
  renderAppointmentsForm,
  scheduleAppointment
};
