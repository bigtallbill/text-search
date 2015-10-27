var Document = require('./document');

var Search = function() {

};

Search.prototype.sortByScore = function (searchTerm, documents, targetKey) {

  var scored = documents.map(function (doc) {
    return new Document(searchTerm, doc, documents, targetKey);
  });

  // sort by inversDocumentFrequency
  scored.sort(function (a, b) {
    var idfA = a.term.inversDocumentFrequency;
    var idfB = b.term.inversDocumentFrequency;

    if (idfA > idfB) {
      return -1;
    } else if (idfA < idfB) {
      return 1;
    }

    return 0;
  });

  scored = scored.map(function (doc) {
    return doc.document;
  });

  return scored;
};

module.exports = Search;
