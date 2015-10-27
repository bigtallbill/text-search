var Search = function() {

};

Search.prototype.searchString = function(term, source) {
  return source.search(term) !== -1;
};

Search.prototype.countWords = function(term, source) {
  return source.split(' ').reduce(function(prev, current) {
    if (current == term) {
      prev += 1;
    }
    return prev;
  }, 0);
};

Search.prototype.countWordsInSet = function(words, sourceSet) {
  var results = {total: 0};

  for (var word in words) {
    if (!words.hasOwnProperty(word)) { continue; }

    word = words[word];
    results[word] = 0;

    for (var source in sourceSet) {
      if (!sourceSet.hasOwnProperty(source)) { continue; }

      source = sourceSet[source];

      var numWords = this.countWords(word, source);
      results[word] += numWords;
      results.total += numWords;
    }
  }

  return results;
};

Search.prototype.scoreSets = function(term, sourceSets) {
  var termWords = term.split(' ');
  var results = [];
  for (var i = 0; i < sourceSets.length; i++) {
    results[i] = this.countWordsInSet(termWords, sourceSets[i]).total;
  }

  return results;
};

module.exports = Search;
