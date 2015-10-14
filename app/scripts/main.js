var user = "teckliew";
var githubAPI = "//api.github.com/users/" + user + "/repos";

// var languages = $.getJSON(githubAPI, {}, function(data) {
//   var languageURLs = [];
//   for (var i = 0; i < data.length; i++) {
//     languageURLs.push(data[i]["languages_url"]);
//   }
//   console.log(langaugeURLS);
// })
var repos = {};

var getGit = {
  getURLs: function(url) {
    return $.getJSON(url).then(function(data) {
      for(var i = 0; i < data.length; i++){
        repos[data[i]["name"]] = {
          link: data[i]["languages_url"],
          langs: {},
        };
      }
    });
  },
  getLangs: function(url) {
    return this.getURLs(url).then(function(urlArray) {
      debugger;
      var promises = [];
      for (var key in repos) {
        if (repos.hasOwnProperty(key)) {
          promises.push($.getJSON(repos[key].link).then(function(data) {
            repos[key].langs = data;
          }));
        }
      }

      Q.all(promises).then(function() {
        console.log(repos);

      });
      // for (var i = 0; i < urlArray.length; i ++){
      //   var regExp = new RegExp();
      //   $.getJSON(urlArray[i]).then(function(data) {
      //     console.log(data);
      //     //console.log(repos);
      //   })
      // }
    })
  }
}

//getGit.getURLs(githubAPI);
getGit.getLangs(githubAPI);
