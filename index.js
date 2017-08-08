/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const map = require('broccoli-stew').map;

module.exports = {

  name: 'ember-gestures',

  included(app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }


    app.import('vendor/jquery.payment.min.js');
  },

  treeForVendor(vendorTree) {
    let trees = [];
    const app = this._findHost();
    const assetPath = __dirname + '/' + app.bowerDirectory + '/jquery.payment/lib/';
    let hammerTree = new Funnel(assetPath, {
      files: ['jquery.payment.min.js']
    });
    hammerTree = map(hammerTree, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);


    if (vendorTree !== undefined) {
      trees.push(vendorTree);
    }

    trees.push(hammerTree);

    return new MergeTrees(trees);
  },

  isDevelopingAddon() {
    return false;
  }

};
