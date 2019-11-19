'use strict';

var format = require('../lib/format.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['format'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'date': function(test) {
    test.equal(format.date('2014-04-01 01:44:11', 'YYYY-MM-DD HH:mm:ss'), '04-01 01:44');
    test.done();
  },
  'string_max': function(test) {
    test.equal(format.string_max('abcdefghijk', 5), 'abcde...');
    test.equal(format.string_max('abcdefghijk', 12), 'abcdefghijk');
    test.equal(format.string_max('abcdefghijk', 5, '.'), 'abcde.');
    test.done();
  },
  'currency': function(test) {
    test.equal(format.currency(1231123.12312), '1,231,123.12');
    test.equal(format.currency(-1231123.12312), '-1,231,123.12');
    test.equal(format.currency(121212121), '121,212,121.00');
    test.equal(format.currency(121212121.12, 0), '121,212,121');
    test.equal(format.currency(121212121.12, 1), '121,212,121.1');
    test.equal(format.currency(121212121, 3), '121,212,121.000');
    test.equal(format.currency(121212121, 3), '121,212,121.000');
    test.done();
  },
  'mask': function(test) {
    test.equal(format.mask('18668080388', 3, 4), '186****0388');
    test.equal(format.mask_mobile('18668080388'), '18*****0388');
    test.equal(format.mask_name('谢君'), '谢*');
    test.equal(format.mask_name('谢小君'), '谢**');
    test.equal(format.mask_bankcard('6225671621760018'), '6225********0018');
    test.done();
  }
};