/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * @noflow
 * @format
 */
'use strict';

/* eslint nuclide-internal/no-commonjs: 0 */

const path = require('path');
const p = inp => path.resolve(__dirname, inp);
const nuclideDir = '../../../'

process.env.BABEL_KEEP_MODULES = false;

module.exports = {
  displayName: 'atom',
  rootDir: p(nuclideDir),
  roots: [p(nuclideDir)],
  testMatch: ['**/__atom_tests__/**/*.js?(x)'],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    "node_modules/(?!@atom-ide-community/(.*))",
  ],
  setupTestFrameworkScriptFile: p('./setupTestFrameworkScriptFile.atom.js'),
  setupFiles: [p('./setup.js')],
  runner: p('../src/index.js'),
  testRunner: require.resolve('jest-circus/runner'),
  moduleNameMapper: {
    oniguruma: p('../__mocks__/emptyObject.js'),
  },
  testEnvironment: p('../src/environment.js'),
  testPathIgnorePatterns: ['/node_modules/'],
  reporters: require('./reporters.config'),
  forceExit: true,
};
