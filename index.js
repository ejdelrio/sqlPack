'use strict';

const sqlPack = module.exports = {};

sqlPack.currentQuery = '';

sqlPack.query = function() {
  sqlPack.currentQuery = '';
  return this;
};

sqlPack.select = function(...props) {
  if(!props) throw new Error('Invalid SELECT parameter in SQL query');
  if(!props.length === 0) throw Error('Pameter contains no values.');

  this.currentQuery += 'SELECT ';

  for(let i = 0; i < props.length; i++) {
    this.currentQuery += `${props[i]}`
    if(i !== props.length - 1) this.currentQuery += ',';
    this.currentQuery += ' ';
  }
  return this;
};

sqlPack.from = function(table) {
  sqlPack.currentQuery += `FROM ${table} `;
  return this;
};

sqlPack.where = function(obj) {
  if(typeof obj !== 'object') throw new Error('WHERE parameter must be an object');

  this.currentQuery += 'WHERE ';
  let keysArr = Object.keys(obj);
  for (let i = 0; i < keysArr.length; i++) {
    let key = keysArr[i];
    let val = obj[key];
    this.currentQuery += `${key}=${val}`;
    if(i !== obj.length - 1) this.currentQuery += ',';
    this.currentQuery += ' ';
  }
  return this;
};