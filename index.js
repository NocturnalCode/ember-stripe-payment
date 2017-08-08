/* jshint node: true */
'use strict';

var map = require('broccoli-stew').map;

module.exports = {
  name: 'ember-stripe-payment',
  treeForVendor(defaultTree) {
    var browserVendorLib = new Funnel(...);

    browserVendorLib = map(browserVendorLib, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);

    return new mergeTrees([defaultTree, browserVendorLib]);
  },
  included: function(app) {
    this._super.included.apply(this, arguments);
    app.import(app.bowerDirectory + '/jquery.payment/lib/jquery.payment.min.js');
    return app;
  }
};
