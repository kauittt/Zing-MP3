const banner = document.querySelector(".category-banner img");
const categoryContent = document.querySelector(".category-content");

async function loadNewRelease() {
    const res = await fetch("https://zing-mp3-api.vercel.app/api/category");
    const { data } = await res.json();
    console.log(data);

    banner.setAttribute("src", data.banners[0].cover);

    [...data.genre].forEach((item) => {
        getListSong(data[i], sections[i]);
    });
}

function getListSong(item, section) {
    const section = document.createElement("div");
    section.className = "section";

    const heading = document.createElement("h2");
    heading.className = "section__heading";
    heading.textContent = item.title;
    section.appendChild(heading);

    const list = document.createElement("div");
    list.className = "section-list";

    item.playlists.forEach((item) => {
        //! listItem
        console.log(item);
        list.insertAdjacentHTML(
            "beforeend",
            loadSectionListItem(item, item.artists)
        );
    });

    section.appendChild(list);
    topContent.append(section);
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

    // console.log(artists);
    loadSingers(artists, div.querySelector(".section-list-item__desc"));

    return div.innerHTML;
}
