/* global describe, it */
'use strict';

var assert = require('power-assert');
var async = require('../../');

function detectIterator(order) {

  return function(num, callback) {

    var self = this;

    setTimeout(function() {

      if (self && self.round) {
        num = self.round(num);
      }

      order.push(num);
      callback(num % 2);
    }, num * 10);
  };
}

describe('#detect', function() {

  it('should execute iterator by collection of array', function(done) {

    var order = [];
    var collection = [1, 3, 2, 4];
    async.detect(collection, detectIterator(order), function(res) {
      assert.strictEqual(res, 1);
      assert.deepEqual(order, [1]);
      done();
    });

  });

  it('should execute iterator by collection of object', function(done) {

    var order = [];
    var collection = {
      a: 5,
      b: 3,
      c: 2
    };
    async.detect(collection, detectIterator(order), function(res) {
      assert.strictEqual(res, 3);
      assert.deepEqual(order, [2, 3]);
      done();
    });

  });

  it('should execute iterator with binding', function(done) {

    var order = [];
    var collection = {
      a: 1.1,
      b: 3.5,
      c: 2.6
    };

    async.detect(collection, detectIterator(order), function(res) {
      assert.strictEqual(res, 1.1);
      assert.deepEqual(order, [1]);
      done();
    }, Math);

  });

  it('should not get item', function(done) {

    var order = [];
    var collection = [2, 6, 4];

    async.detect(collection, detectIterator(order), function(res) {
      assert.strictEqual(res, undefined);
      assert.deepEqual(order, [2, 4, 6]);
      done();
    });
  });

  it('should return response immediately if array is empty', function(done) {

    var order = [];
    var array = [];
    async.detect(array, detectIterator(order), function(res) {
      assert.strictEqual(res, undefined);
      assert.deepEqual(order, []);
      done();
    });

  });

  it('should return response immediately if object is empty', function(done) {

    var order = [];
    var object = {};
    async.detect(object, detectIterator(order), function(res) {
      assert.strictEqual(res, undefined);
      assert.deepEqual(order, []);
      done();
    });

  });

});

describe('#detectSeries', function() {

  it('should execute iterator by collection of array', function(done) {

    var order = [];
    var collection = [1, 3, 2, 4];
    async.detectSeries(collection, detectIterator(order), function(res) {
      assert.strictEqual(res, 1);
      assert.deepEqual(order, [1]);
      done();
    });

  });

  it('should execute iterator by collection of object', function(done) {

    var order = [];
    var collection = {
      a: 5,
      b: 3,
      c: 2
    };
    async.detectSeries(collection, detectIterator(order), function(res) {
      assert.strictEqual(res, 5);
      assert.deepEqual(order, [5]);
      done();
    });

  });

  it('should execute iterator with binding', function(done) {

    var order = [];
    var collection = {
      a: 1.1,
      b: 3.5,
      c: 2.6
    };

    async.detectSeries(collection, detectIterator(order), function(res) {
      assert.strictEqual(res, 1.1);
      assert.deepEqual(order, [1]);
      done();
    }, Math);

  });

  it('should not get item', function(done) {

    var order = [];
    var collection = [2, 6, 4];

    async.detectSeries(collection, detectIterator(order), function(res) {
      assert.strictEqual(res, undefined);
      assert.deepEqual(order, [2, 6, 4]);
      done();
    });
  });

  it('should return response immediately if array is empty', function(done) {

    var order = [];
    var array = [];
    async.detectSeries(array, detectIterator(order), function(res) {
      assert.strictEqual(res, undefined);
      assert.deepEqual(order, []);
      done();
    });

  });

  it('should return response immediately if object is empty', function(done) {

    var order = [];
    var object = {};
    async.detectSeries(object, detectIterator(order), function(res) {
      assert.strictEqual(res, undefined);
      assert.deepEqual(order, []);
      done();
    });

  });

  it('should throw error if double callback', function(done) {

    var collection = [1, 3, 2, 4];
    var iterator = function(num, callback) {
      callback();
      callback();
    };
    try {
      async.detectSeries(collection, iterator);
    } catch(e) {
      assert.strictEqual(e.message, 'Callback was already called.');
      done();
    }

  });

});

describe('#detectLimit', function() {

  it('should execute iterator in limited by collection of array', function(done) {

    var order = [];
    var collection = [2, 3, 1];

    async.detectLimit(collection, 2, detectIterator(order), function(res) {
      assert.strictEqual(res, 3);
      assert.deepEqual(order, [2, 3]);
      done();
    });

  });

  it('should execute iterator to series by collection of object', function(done) {

    var order = [];
    var collection = {
      a: 2,
      b: 3,
      c: 1,
      d: 3,
      e: 1
    };
    async.detectLimit(collection, 3, detectIterator(order), function(res) {
      assert.strictEqual(res, 1);
      assert.deepEqual(order, [1]);
      done();
    });

  });

  it('should execute iterator to series with binding', function(done) {

    var order = [];
    var collection = {
      a: 2.1,
      b: 3.5,
      c: 2.7
    };

    async.detectLimit(collection, 2, detectIterator(order), function(res) {
      assert.strictEqual(res, 2.7);
      assert.deepEqual(order, [2, 4, 3]);
      done();
    }, Math);

  });

  it('should not get item', function(done) {

    var order = [];
    var collection = [2, 6, 4];

    async.detectLimit(collection, 2, detectIterator(order), function(res) {
      assert.strictEqual(res, undefined);
      assert.deepEqual(order, [2, 6, 4]);
      done();
    });

  });

  it('should return response immediately if array is empty', function(done) {

    var order = [];
    var array = [];
    async.detectLimit(array, 2, detectIterator(order), function(res) {
      assert.strictEqual(res, undefined);
      assert.deepEqual(order, []);
      done();
    });

  });

  it('should return response immediately if object is empty', function(done) {

    var order = [];
    var object = {};
    async.detectLimit(object, 2, detectIterator(order), function(res) {
      assert.strictEqual(res, undefined);
      assert.deepEqual(order, []);
      done();
    });

  });
});

