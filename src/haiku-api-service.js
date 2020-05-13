import config from "./config";

const HaikuApiService = {
  getAllHaikus() {
    return fetch(`${config.API_ENDPOINT}api/`, {
      method: "GET",
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch();
  },

  insertNewHaiku(haikuArr) {
    return fetch(`${config.API_ENDPOINT}api/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        haiku: haikuArr,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default HaikuApiService;
