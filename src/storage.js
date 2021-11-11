function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

const info = window.sessionStorage;

async function getAPI(url) {
    const response = await fetch(url);
    var data = await response.json();
    return data;
}

export {info, getAPI, sleep}