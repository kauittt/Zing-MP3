const endpoint = `https://apizingmp3.vercel.app/api/top100`;

async function loadSection() {
    const response = await fetch(endpoint);
    const { data } = await response.json();
    [...data].forEach((item) => {
        getListSong(item);
    });
}

function getListSong(items) {
    items.forEach((item) => {
        loadItem(item);
    });
}

function loadItem(item, data) {
    let section = document.createElement("div");
    section.textContent = item.title;
    const img = item.querySelector("img");
    const heading = item.querySelector(".section-list-item__heading");
    const desc = item.querySelector(".section-list-item__desc");

    img.src = data.thumbnail;
    heading.textContent = data.title;

    desc.textContent = "";
    data.artists.forEach((item) => {
        desc.textContent += `${item.name}, `;
    });
    desc.textContent = desc.textContent.slice(0, -2);
}

loadSection();
