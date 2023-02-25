const drag = document.querySelector(".play-main-time__drag");
const topItems = document.querySelectorAll(".top100 .section-list-item");

drag.addEventListener("input", function (e) {
    const value = e.target.value;
    const progress = `linear-gradient(90deg, #d14781 ${value}%, #e0b2b1 ${value}%)`;
    drag.style.background = progress;
});

const endpoint = `https://apizingmp3.vercel.app/api/`;
async function getListSong(param) {
    const response = await fetch(`${endpoint}${param}`);
    const { data } = await response.json();
    const list = data[0].items;

    console.log(list);

    for (let i = 0; i < topItems.length; i++) {
        loadItem(topItems[i], list[i]);
    }
}

function loadItem(item, data) {
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

await getListSong("top100");
