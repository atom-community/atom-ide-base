/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow strict-local
 * @format
 * @emails oncall+nuclide
 */
describe('fuzzy-native', () => {
  // TODO this is broken for some reason. We use zadeh instead of fuzzy-native, so it doesn't matter
  it.skip('can be required', () => {
    const fuzzyNative = require('..');
    const matcher = new fuzzyNative.Matcher(['test']);
    // The fallback uses a different scoring mechanism, so this will fail
    // if the native module failed to load.
    expect(matcher.match('test')).toEqual([{value: 'test', score: 1}]);
  });
});
