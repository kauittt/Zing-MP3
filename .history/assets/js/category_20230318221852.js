const banner = document.querySelector(".category-banner img");
const categoryContent = document.querySelector(".category-content");

async function loadCategory() {
    const res = await fetch("https://zing-mp3-api.vercel.app/api/category");
    const { data } = await res.json();
    console.log(data);

    banner.setAttribute("src", data.banners[0].cover);

    [...data.genre].forEach((section) => {
        getCategoryListSong(section);
    });
}

function getCategoryListSong(section) {
    const tmpSection = document.createElement("div");
    tmpSection.className = "section";
    tmpSection.setAttribute("data-id", section.encodeId);

    const heading = document.createElement("h2");
    heading.className = "section__heading";
    heading.textContent = section.title;
    tmpSection.appendChild(heading);

    const more = document.createElement("p");
    more.className = "section__more";
    more.textContent = "Tất cả >";
    tmpSection.appendChild(more);

    const list = document.createElement("div");
    list.className = "section-list";

    for (let i = 0; i < 5; i++) {
        const playlist = section.playlists[i];
        list.insertAdjacentHTML(
            "beforeend",
            loadSectionListItem(playlist, playlist.artists)
        );
    }

    tmpSection.appendChild(list);
    categoryContent.appendChild(tmpSection);
}

function loadSectionListItem(item, artists) {
    const div = document.createElement("div");

    const template = `
            <div class="section-list-item" data-id="${item.encodeId}">
                <div class="section-list-item-img" data-id="${item.encodeId}">
                    <img
                        src="${item.thumbnailM}"
                        alt=""
                    />
                    <div
                        class="layer"
                    >
                        <i
                            class="fa-regular fa-circle-play"
                        ></i>
                    </div>
                </div>

                <div class="section-list-item-infor">
                    <h3 class="section-list-item__heading ">
                        ${item.title}
                    </h3>
                    <p class="section-list-item__desc">
                    </p>
                </div>
            </div>
`;
    div.insertAdjacentHTML("beforeend", template);
    loadSingers(artists, div.querySelector(".section-list-item__desc"));

    return div.innerHTML;
}

categoryContent.addEventListener("click", handleItemClick);
