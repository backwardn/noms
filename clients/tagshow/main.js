'use strict';

var Immutable = require('immutable');
var noms = require('noms');
var queryString = require('query-string');
var Photo = require('./photo.js');
var React = require('react');
var Root = require('./root.js');

window.onload =
    window.onhashchange = render;

function updateQuery(qs) {
  location.hash = queryString.stringify(qs.toObject());
}

function render() {
  var qs = queryString.parse(location.hash);
  var target = document.getElementById('root');

  if (qs.server) {
    noms.setServer(qs.server);
  }

  if (qs.img) {
    Photo.setServer(qs.img);
  }

  // NOTE: This actually does a fetch, so if render() starts getting called
  // more frequently (e.g., in response to window resize), then this should
  // get moved someplace else.
  var pRoot = noms.getRoot()
      .then(ref => noms.readValue(ref, noms.getChunk));

  React.render(
    <Root
      qs={Immutable.Map(qs)}
      pRoot={pRoot}
      updateQuery={updateQuery}/>, target);
}
