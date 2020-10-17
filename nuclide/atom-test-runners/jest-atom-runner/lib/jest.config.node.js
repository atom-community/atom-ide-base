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

module.exports = {
  displayName: 'node',
  rootDir: p(nuclideDir),
  roots: [p(nuclideDir)],
  testMatch: ['**/__tests__/**/*.js?(x)'],
  transform: {
    '\\.js$': p('./transform.js'),
  },
  setupTestFrameworkScriptFile: p('./setupTestFrameworkScriptFile.node.js'),
  setupFiles: [p('./setup.js')],
  testRunner: require.resolve('jest-circus/runner'),
  moduleNameMapper: {
    electron: p('../__mocks__/emptyObject.js'),
  },
  testPathIgnorePatterns: ['/node_modules/'],
  reporters: require('./reporters.config'),
  forceExit: true,
};
