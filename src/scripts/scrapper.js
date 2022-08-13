import { $$ } from "../utils/selectors";

function getUrl() {
  let url = prompt("Ingresa la palabra clave que deseas buscar: ", "Fullstack");
  window.open(
    "https://www.linkedin.com/search/results/people/?keywords=" + url,
    "Linkedin",
    "self"
  );

  window.addEventListener("load", () => {
    return true;
  });
}

function getProfiles() {
  const profiles = $$(".entity-result__item");
  return profiles;
}

function getProfileInfo(element) {
  return {
    name: element.children[0].children[0].children[0].children[0].children[0]
      .children[0].children[0].children[0].textContent,
    link: element.children[0].children[0].children[0].children[0].children[0]
      .children[0].href,
    position:
      element.children[0].children[1].children[0].children[0].textContent
        .replace("\n", "")
        .trim(),
    location:
      element.children[0].children[1].children[0].children[1].textContent
        .replace("\n", "")
        .trim(),
  };
}

function getProfileExtraInfo(element) {
  try {
    return element.children[1].children[0].innerText;
  } catch (error) {
    return "No extra info";
  }
}

function getProfilePicture(element) {
  const img =
    element.children[0].children[0].children[0].children[0].children[0]
      .children[0].src;
  if (img == undefined) {
    return "El perfil no tiene imagen";
  }
  return img;
}

function pushProfiles(array, url) {
  request = fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(array),
  })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
}

function fetchProfiles(profiles, url) {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(profiles),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

async function scrap() {
  // const loaded = await getUrl()
  const rawProfiles = await getProfiles();
  const profiles = await rawProfiles.map((profile) => {
    return {
      info: getProfileInfo(profile.children[1]),
      img: getProfilePicture(profile.children[0]),
      extraInfo: getProfileExtraInfo(profile.children[1]),
    };
  });
  fetchProfiles(profiles, 'https://jsonplaceholder.typicode.com/posts')
}

scrap();
