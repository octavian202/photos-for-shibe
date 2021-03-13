const PATH = "./db.json";

function writeJsonToDb(path, data) {
  try {
    let dataJson = JSON.stringify(data);
    Deno.writeTextFileSync(path, dataJson);
    return `${dataJson}
          Writen to ${path}
          `;
  } catch (err) {
    return err.message;
  }
}

async function getPhotos(count) {
  let apiUrl =
    `http://shibe.online/api/shibes?count=${count}&urls=true&httpsUrls=true`;
  let response = await fetch(apiUrl);
  let data = await response.json();
  return data;
}

getPhotos(29)
  .then((data) => {
    console.log(data);
    return {
      urls: data,
      profile: {
        name: "typicode",
      },
    };
  })
  .then((photos) => {
    console.log(writeJsonToDb("./db.json", photos));
  });
