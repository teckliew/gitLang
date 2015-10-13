var user = "teckliew";
var githubAPI = "//api.github.com/users/" + user + "/repos";

// var languages = $.getJSON(githubAPI, {}, function(data) {
//   var languageURLs = [];
//   for (var i = 0; i < data.length; i++) {
//     languageURLs.push(data[i]["languages_url"]);
//   }
//   console.log(langaugeURLS);
// })


var getGit = {
  getURLs: function(url) {
    return $.getJSON(url).then(function(data) {
      var languageURLs = [];
      for(var i = 0; i < data.length; i++){
        languageURLs.push(data[i]["languages_url"]);
      }
      return languageURLs;
    });
  },
  getTitles: function(url) {
    return this.getURLs(url).then(function(urlArray) {
      for (var i = 0; i < urlArray.length; i ++){
        $.getJSON(urlArray[i]).then(function(data) {
          console.log(data);
        })
      }
    })
  }
}

getGit.getTitles(githubAPI);
