// API adresi ve API anahtarınızı tanımlayın
const apiURL = "https://api.collectapi.com/news/getNews?country=tr&tag=general";
const apiKey = "31F0Bx2P6I54kfDmifzBN0:2kD2Yo7lL9B0NLEkVWlo0U";
const apiURLAlmanya =
  "https://api.collectapi.com/news/getNews?country=de&tag=general";
// Haber kartlarını oluşturup ekleme fonksiyonu
function createNewsCards(newsData, startIndex, totalItems) {
  const container = document.getElementById("newsContainer");

  for (let i = startIndex; i < Math.min(startIndex + 4, totalItems); i++) {
    const news = newsData[i];

    const card = document.createElement("div");
    card.className = "card";

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
    createNewsCards(data.result, 2, data.result.length); // 1. haber yukarda

    const resultCount = data.result.length;
    console.log("Toplam " + resultCount + " tane key bulunuyor.");
  })
  .catch((error) => {
    console.error("Bir hata oluştu:", error);
  });

// Daha Fazla butonunu seçin
const moreNewsButton = document.querySelector(".moreNews");

// Daha Fazla butonuna tıklandığında haberleri listeleyen fonksiyon
// Daha Fazla butonuna tıklandığında haberleri listeleyen fonksiyon
function listMoreNews() {
  fetch(apiURL, {
    headers: {
      Authorization: `apikey ${apiKey}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const startIndex = document.querySelectorAll(".card").length;
      const totalItems = data.result.length;
      const remainingItems = totalItems - startIndex;

      // Eklenecek haberlerin sayısı
      const itemsToAdd = Math.min(remainingItems, 4);

      // Haberleri listeleyin
      createNewsCards(data.result, startIndex, startIndex + itemsToAdd);

      if (startIndex + itemsToAdd >= totalItems) {
        // Eğer tüm haberler listelenmişse, Daha Fazla butonunu gizle
        moreNewsButton.style.display = "none";
      }
    })
    .catch((error) => {
      console.error("Bir hata oluştu:", error);
    });
}

// Daha Fazla butonuna tıklama olayını dinleyin
moreNewsButton.addEventListener("click", listMoreNews);

// Almanya API adresi ve API anahtarınızı tanımlayın

// fetch() ile API'den verileri çekin
fetch(apiURLAlmanya, {
  headers: {
    Authorization: `apikey ${apiKey}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    const targetObjectAlmanya = data.result.find((item) => item.key === "1");
    const image1_imageAlmanya = targetObjectAlmanya.image;
    const image1_nameAlmanya = targetObjectAlmanya.name;
    document.getElementById("livePicture").src = image1_imageAlmanya;
    document.getElementById("liveExplain").textContent = image1_nameAlmanya;
    console.log("Almanya'nın ismi: " + image1_nameAlmanya);
  })
  .catch((error) => {
    console.error("Bir hata oluştu:", error);
  });
