// fetch() ile API'den verileri çekin
const urlParams = new URLSearchParams(window.location.search);
const tag = urlParams.get("tag") || "general"; // Varsayılan olarak "general" kullanılacak
const apiURL = `https://api.collectapi.com/news/getNews?country=tr&tag=${tag}`;
const apiAdana = "https://api.collectapi.com/news/getNewsLocal?city=adana";
const apiKeyAdana = "31F0Bx2P6I54kfDmifzBN0:2kD2Yo7lL9B0NLEkVWlo0U";
const apiKey = "31F0Bx2P6I54kfDmifzBN0:2kD2Yo7lL9B0NLEkVWlo0U";
const apiURLAlmanya =
  "https://api.collectapi.com/news/getNews?country=de&tag=general";
// Haber kartlarını oluşturup ekleme fonksiyonu

function createNewsCards(newsData, startIndex, totalItems) {
  const container = document.getElementById("newsContainer");

  for (let i = startIndex; i < Math.min(startIndex + 4, totalItems); i++) {
    const news = newsData[i];

    const card = document.createElement("div");
    card.className = "card shadow p-3 mb-5 bg-white rounded";

    const row1 = document.createElement("div");
    row1.className = "row";
    const link = document.createElement("a");
    link.href = news.url;
    link.target = "_blank";
    link.className = "oneNew";
    row1.appendChild(link);
    const image = document.createElement("img");
    image.src = news.image;
    image.alt = "Resim";
    image.id = "new" + (i + 1);
    link.appendChild(image);
    card.appendChild(row1);

    const row2 = document.createElement("div");
    row2.className = "row oneNewHeaderRow";
    const header = document.createElement("p");
    header.className = "oneNewHeader";
    header.textContent = news.name;
    row2.appendChild(header);
    card.appendChild(row2);

    const row3 = document.createElement("div");
    row3.className = "row oneNewExplainRow";
    const explain = document.createElement("p");
    explain.className = "oneNewExplain";
    explain.textContent = news.description;
    row3.appendChild(explain);
    card.appendChild(row3);

    const row4 = document.createElement("div");
    row4.className = "row oneNewSourceRow";
    const source = document.createElement("p");
    source.className = "oneNewSource";
    source.textContent = news.source;
    row4.appendChild(source);
    card.appendChild(row4);

    const row5 = document.createElement("div");
    row5.className = "row";
    const icon = document.createElement("p");
    source.className = "oneNewIcon";

    row4.appendChild(source);
    card.appendChild(row4);

    container.appendChild(card);
  }
}

// fetch() ile API'den verileri çekin
fetch(apiURL, {
  headers: {
    Authorization: `apikey ${apiKey}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    // İlk haber için verileri kullanarak elementleri güncelleyin
    const targetObject = data.result.find((item) => item.key === "1");
    const image1_url = targetObject.url;
    const image1_description = targetObject.description;
    const image1_image = targetObject.image;
    const image1_name = targetObject.name;
    const image1_source = targetObject.source;

    document.getElementById("firstNewPicture").src = image1_image;
    document.getElementById("firstNewHeader").textContent = image1_name;
    document.getElementById("firstNewExplain").textContent = image1_description;
    document.getElementById("firstNewSource").textContent = image1_source;
    document.getElementById("firstNewAHref").href = image1_url;

    // Diğer haber kartlarını oluşturun
    createNewsCards(data.result, 4, data.result.length); // 1. ve 2. haber yukarda

    const resultCount = data.result.length;
    console.log("Toplam " + resultCount + " tane key bulunuyor.");

    const targetObjectLive = data.result.find((item) => item.key === "2");

    const image_image = targetObjectLive.image;
    const image_name = targetObjectLive.name;
    const image_url = targetObjectLive.url;

    document.getElementById("livePicture").src = image_image;
    document.getElementById("liveExplain").textContent = image_name;
    document.getElementById("livePicturesA").href = image_url;

    // const resultCountString = resultCount.toString();
    // const targetObjectLive = data.result.find(
    //   (item) => item.key === resultCountString
    // );
    // const live_url = targetObjectLive.url;
    // console.log("live-url: " + live_url);

    const targetObjectLive3 = data.result.find((item) => item.key === "3");

    const image_image3 = targetObjectLive3.image;
    const image_name3 = targetObjectLive3.name;
    const image_description3 = targetObjectLive3.description;
    const image_url3 = targetObjectLive3.url;

    document.getElementById("carouselImage1").src = image_image3;
    document.getElementById("carouselheader1").textContent = image_name3;
    document.getElementById("carouselText1").textContent = image_description3;
    document.getElementById("carouselImage1").href = image_url3;
    // ---------------------------------------------------------
    const targetObjectLive4 = data.result.find((item) => item.key === "4");

    const image_image4 = targetObjectLive4.image;
    const image_name4 = targetObjectLive4.name;
    const image_descrption4 = targetObjectLive4.description;
    const image_url4 = targetObjectLive4.url;

    document.getElementById("carouselImage2").src = image_image4;
    document.getElementById("carouselheader2").textContent = image_name4;
    document.getElementById("carouselText2").textContent = image_descrption4;
    document.getElementById("carouselImage2").href = image_url4;
  })
  .catch((error) => {
    console.error("Bir hata oluştu:", error);
  });

// Daha Fazla butonunu seçin
const moreNewsButton = document.querySelector(".moreNews");

function changeTag(tagName) {
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set("tag", tagName);
  window.location.href = currentUrl.href;
}

window.addEventListener("DOMContentLoaded", function () {
  const tagLinks = document.querySelectorAll(".tagLink");
  tagLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Sayfanın yeniden yüklenmesini engellemek için önlem alın

      const tagName = this.getAttribute("data-tag");
      changeTag(tagName);
    });
  });
});

var apiRSS =
  "https://api.collectapi.com/news/getNewsfromRSS?data.rss_url=http%3A%2F%2Fwww.haberturk.com/%2Ffeed%2F";
// fetch() ile API'den verileri çekin
fetch(apiRSS, {
  headers: {
    Authorization: `apikey ${apiKey}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    // İlk haber için verileri kullanarak elementleri güncelleyin

    if (Array.isArray(data.result) && data.result.length > 0) {
      // `data.result` dizisi boş değil, işlemleri gerçekleştir
      console.log("`data.result` dizisi boş değil, işlemleri gerçekleştir");
      const targetObjectRss = data.result.find((item) => item.key === "1");
      // ...
    } else {
      console.log("data.result boş veya tanımlanmamış.");
    }

    // const targetObjectRss = data.result.find((item) => item.key === "1");
    // const image1_urlR = targetObjectRss.url;
    // const image1_descriptionR = targetObjectRss.description;
    // const image1_imageR = targetObjectRss.image;
    // const image1_nameR = targetObjectRss.name;
    // const image1_sourceR = targetObjectRss.source;
    // console.log("image1_urlR: " + image1_urlR);
    // console.log("image1_descriptionR: " + image1_descriptionR);
    // console.log("image1_imageR: " + image1_imageR);
    // console.log("image1_nameR: " + image1_nameR);
    // console.log("image1_nameR: " + image1_nameR);
    // console.log("image1_sourceR: " + image1_sourceR);
  })
  .catch((error) => {
    console.error("Bir hata oluştu:", error);
  });

fetch(apiAdana, {
  // api deki city bilgisi çekmede sıkınıt var
  // data.result boş veya tanımlanmamış
  headers: {
    Authorization: `apikey ${apiKeyAdana}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    if (Array.isArray(data.result) && data.result.length > 0) {
      // `data.result` dizisi boş değil, işlemleri gerçekleştir
      const targetCity = data.result.find((item) => item.key === "1");
      const city_url = targetCity.url;

      console.log("city_url: " + city_url);

      const resultCount = data.result.length;
      console.log("Toplam " + resultCount + " tane city key bulunuyor.");
    } else {
      console.log("data.result boş veya tanımlanmamış. adanaaaa ");
    }
  })
  .catch((error) => {
    console.error("Bir hata oluştu:", error);
  });

const url =
  "https://api.collectapi.com/news/getNewsfromRSS?data.rss_url=http%3A%2F%2Fwww.webrazzi.com%2Ffeed%2F";

fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `apikey ${apiKey}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log("data RSS: " + data.result);
  })
  .catch((error) => {
    console.error("Bir hata oluştu:", error);
  });

// const carouselContainer = document.querySelector(".carouselNews");
// const carouselItems = carouselContainer.querySelectorAll(".carouselNew");
// const nextButton = document.querySelector(".buttonNextBack button:first-child");
// const prevButton = document.querySelector(".buttonNextBack button:last-child");

// let currentIndex = 0;

// nextButton.addEventListener("click", () => {
//   // // Bir sonraki haberin indeksini hesapla
//   // const nextIndex = (currentIndex + 1) % carouselItems.length;
//   // // Mevcut haberi gizle
//   // carouselItems[currentIndex].classList.remove("active");
//   // // Bir sonraki haberi göster
//   // carouselItems[nextIndex].classList.add("active");
//   // // Mevcut indeksi güncelle
//   // currentIndex = nextIndex;
//   console.log("next butona bastın");
// });

// prevButton.addEventListener("click", () => {
//   // Bir önceki haberin indeksini hesapla
//   const prevIndex =
//     (currentIndex - 1 + carouselItems.length) % carouselItems.length;
//   // Mevcut haberi gizle
//   carouselItems[currentIndex].classList.remove("active");
//   // Bir önceki haberi göster
//   carouselItems[prevIndex].classList.add("active");
//   // Mevcut indeksi güncelle
//   currentIndex = prevIndex;
// });

function calisanFonksiyon() {
  console.log("1 sn geçti");
  // resultCount -> toplam haber sayısı
  // fetch() ile API'den verileri çekin
  fetch(apiURL, {
    headers: {
      Authorization: `apikey ${apiKey}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      var indexResulCount2 = data.result.length;

      console.log("indexResulCount2: " + indexresulCount2);
      // if (indexresulCount < 2) {
      //   indexresulCount == resultCount;
      //   // indexresultCountu azaltmayı unutma
      // }
      const targetObjectLive3 = data.result.find(
        (item) => item.key == indexresulCount
      );

      const image_image3 = targetObjectLive3.image;
      const image_name3 = targetObjectLive3.name;
      const image_description3 = targetObjectLive3.description;
      const image_url3 = targetObjectLive3.url;

      document.getElementById("carouselImage1").src = image_image3;
      document.getElementById("carouselheader1").textContent = image_name3;
      document.getElementById("carouselText1").textContent = image_description3;
      document.getElementById("carouselImage1").href = image_url3;
      // ---------------------------------------------------------
      const targetObjectLive4 = data.result.find(
        (item) => item.key == indexresulCount - 1
      );

      const image_image4 = targetObjectLive4.image;
      const image_name4 = targetObjectLive4.name;
      const image_descrption4 = targetObjectLive4.description;
      const image_url4 = targetObjectLive4.url;

      document.getElementById("carouselImage2").src = image_image4;
      document.getElementById("carouselheader2").textContent = image_name4;
      document.getElementById("carouselText2").textContent = image_descrption4;
      document.getElementById("carouselImage2").href = image_url4;
    })
    .catch((error) => {
      console.error("Bir hata oluştu:", error);
    });
}

// Her 10 saniyede bir calisanFonksiyon'u çağırmak için setInterval kullanıyoruz
//setInterval(calisanFonksiyon, 1000);
