const endpoint = `https://apizingmp3.vercel.app/api/top100`;

async function loadSection() {
    const response = await fetch(endpoint);
    const { data } = await response.json();
    [...data].forEach((item) => {
        let section = document.createElement("div");
        section.textContent = item.title;
        getListSong(item, section);
    });
}

function getListSong(item, section) {
    item.forEach((item) => {
        loadItem(item, section);
    });
}

function loadItem(item, data) {
    img.src = data.thumbnail;
    heading.textContent = data.title;

    desc.textContent = "";
    data.artists.forEach((item) => {
        desc.textContent += `${item.name}, `;
    });
    desc.textContent = desc.textContent.slice(0, -2);
}

loadSection();
