'use strict';

const sqlPack = module.exports = {};

sqlPack.currentQuery = '';

sqlPack.query = function() {
  sqlPack.currentQuery = '';
  return this;
};

sqlPack.select = function(...props) {
  if(!props) throw new Error('Invalid SELECT parameter in SQL query');
  if(!props.length === 0) throw Error('Parameter contains no values.');

  this.currentQuery += 'SELECT ';

  for(let i = 0; i < props.length; i++) {
    let val = props[i]
    this.currentQuery += `${val}`
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
    if(i !== keysArr.length - 1) this.currentQuery += ',';
    this.currentQuery += ' ';
  }
  return this;
};

sqlPack.end = function(callback) {
  let query = this.currentQuery;
  for (let i = 0; i < query.length; i++) {
    if(query[i] === ';') throw new Error('Query contains invalid character. ";" character not allowed in query');
  }
  this.currentQuery += ';';
  //Query submission occurs here and values are passed to callback;
  console.log(this.currentQuery);
  this.currentQuery = '';
}