/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



jasmineRequire.HtmlReporter = function (j$) {


  function HtmlReporter(options) {
    var config = function () {
      return (options.env && options.env.configuration()) || {};
    },
      getContainer = options.getContainer,
      createElement = options.createElement,
      createTextNode = options.createTextNode,
      navigateWithNewParam = options.navigateWithNewParam || function () { },
      addToExistingQueryString =
      options.addToExistingQueryString || defaultQueryString,
      filterSpecs = options.filterSpecs,
      htmlReporterMain,
      symbols,
      deprecationWarnings = [];

    var totalSpecsDefined;

    var summary = createDom('div', {className: 'jasmine-summary'});

    var stateBuilder = new ResultsStateBuilder();
    var failures = [];


    return this;
  }

  return HtmlReporter;
};
