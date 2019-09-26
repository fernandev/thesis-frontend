const router = require('express').Router();
const url = require('url');

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/list', (req, res) => {
  res.render('list', {
    appointments: [{
      doctor: "Thalia Cobb",
      specialty: "Gastroentereologia",
      patient: "Marcos Fernandes",
      time: "25/08/2018 20:00",
      insurance: "Amil"
    }, {
      doctor: "Jose Camargo Lacerda",
      specialty: "Acupuntura",
      patient: "Marcos",
      time: "25/08/2019 10:30",
      insurance: "Amil"
    }]
  });
});

router.get('/schedule', async (req, res) => {
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
});

router.post('/schedule', async (req, res, next) => {
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
});

module.exports = router;