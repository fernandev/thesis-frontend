const renderAppointments = (req, res) => {
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
};

module.exports = {
  renderAppointments
};
