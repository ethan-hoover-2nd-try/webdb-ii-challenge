
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { make: 'toyota', model: 'camry', vin: '123', mileage: '1000', transmission: 'idk', status: 'used' },
        { make: 'kia', model: 'soul', vin: '12345', mileage: '200', transmission: 'idk', status: 'clean' },
        { make: 'crysler', model: 'pt cruiser', vin: '1234567', mileage: '3000', transmission: 'idk', status: 'salvage' }
      ]);
    });
};
