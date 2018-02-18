'use strict';

const sqlPack = require('./index.js');

sqlPack.query()
  .select('name', 'location', 'age')
  .from('students')
  .where({name: 'Edwin', age: '29', location: 'Seattle'})
  .end((err, result) => {
    if(err) return err;
    console.log(result);
  });
