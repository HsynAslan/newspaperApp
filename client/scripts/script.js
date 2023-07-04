// API adresi ve API anahtarınızı tanımlayın
const apiURL = "https://api.collectapi.com/news/getNews?country=tr&tag=general";
const apiKey = "31F0Bx2P6I54kfDmifzBN0:2kD2Yo7lL9B0NLEkVWlo0U";

// fetch() ile API'den verileri çekin
fetch(apiURL, {
  headers: {
    Authorization: `apikey ${apiKey}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    // Key değeri 1 olan nesnenin image bilgisini alın
    // const targetObject = data.result.find((item) => item.key === "1");
    // const image = targetObject.image;
    // Alınan image bilgisini kullanarak istediğiniz işlemi yapın
    // console.log("Key 1 olan nesnenin image bilgisi:", image);

    const targetObject = data.result.find((item) => item.key === "1");
    const image1_url = targetObject.url;

    const targetObject2 = data.result.find((item) => item.key === "1");
    const image1_description = targetObject2.description;

    const targetObject3 = data.result.find((item) => item.key === "1");
    const image1_image = targetObject3.image;

    const targetObject4 = data.result.find((item) => item.key === "1");
    const image1_name = targetObject4.name;

    const targetObject5 = data.result.find((item) => item.key === "1");
    const image1_source = targetObject5.source;

    document.getElementById("firstNewPicture").src = image1_image;
    document.getElementById("firstNewHeader").textContent = image1_name;
    document.getElementById("firstNewExplain").textContent = image1_description;
    document.getElementById("firstNewSource").textContent = image1_source;

    document.getElementById("firstNewAHref").href = image1_url;
  })
  .catch((error) => {
    console.error("Bir hata oluştu:", error);
  });
