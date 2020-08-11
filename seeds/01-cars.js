
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { vin: '1KJSDFL9823BND8D', make: 'Jeep', model: 'Cherokee', mileage: 218198, transmission_type: 'automatic', title_status: 'clean' },
        { vin: '45BLKN34WDMCS8S8', make: 'Saturn', model: 'SL1', mileage: 225458, title_status: 'clean' },
        { vin: 'SDFSD9F7SD9F87SD', make: 'Tesla', model: 'Model S', mileage: 8954 },
        { vin: 'SVSX970S9D789SSD', make: 'Ford', model: 'F150', mileage: 45689 },
        { vin: 'JFHFG5F6GHFG768F', make: 'Toyota', model: 'Corolla', mileage: 120456 }
      ]);
    });
};
