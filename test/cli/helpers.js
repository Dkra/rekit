/* eslint strict: 0, no-unused-expressions: 0 */
'use strict';

const path = require('path');
const expect = require('chai').expect;
const shell = require('shelljs');
const _ = require('lodash');

function mapFile(file) {
  return path.join(__dirname, '../../src', file);
}

function mapFeatureFile(file) {
  return path.join(__dirname, '../../src/features/test', file);
}

function exec(cmd) {
  // console.log('Test: ', cmd);
  expect(shell.exec(cmd, { silent: true }).code).to.equal(0);
}

function pureExec(cmd) {
  return shell.exec(cmd, { silent: true });
}

function expectError(cmd) {
  expect(pureExec(cmd).code).to.equal(1);
}

function expectFile(file) {
  expect(shell.test('-e', file)).to.be.true;
}

function expectFiles(files) {
  files.forEach(expectFile);
}

function expectNoFile(file) {
  expect(shell.test('-e', file)).to.be.false;
}

function expectNoFiles(files) {
  files.forEach(expectNoFile);
}

function getLines(file) {
  if (_.isArray(file)) return file; // already lines
  return shell.cat(file).split('\n');
}

function expectLine(file, line) {
  const lines = getLines(file);
  expect(_.includes(lines, line)).to.be.true;
}

function expectLines(file, lines) {
  lines.forEach(line => expectLine(file, line));
}

function expectNoLine(file, line) {
  const lines = getLines(file);
  expect(_.includes(lines, line)).to.be.false;
}

function expectNoLines(file, lines) {
  lines.forEach(line => expectNoLine(file, line));
}

module.exports = {
  mapFile,
  mapFeatureFile,
  exec,
  pureExec,
  expectError,
  expectFile,
  expectFiles,
  expectNoFile,
  expectNoFiles,
  getLines,
  expectLine,
  expectNoLine,
  expectLines,
  expectNoLines,
};