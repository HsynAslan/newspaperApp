var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    var response = this.responseText;
  }
});

// xhr.addEventListener("readystatechange", function () {
//     if (this.readyState === this.DONE) {
//       var response = JSON.parse(this.responseText);
//       var news = response.result;

//       for (var i = 0; i < news.length; i++) {
//         if (news[i].key === "2") {
//           var url = news[i].url;
//           console.log(url);
//           break;
//         }
//       }
//     }
//   });

xhr.open(
  "GET",
  "https://api.collectapi.com/news/getNews?country=tr&tag=general"
);
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader(
  "authorization",
  "apikey 31F0Bx2P6I54kfDmifzBN0:2kD2Yo7lL9B0NLEkVWlo0U"
);

xhr.send(data);
