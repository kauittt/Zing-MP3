//! pageTop
const topContent = document.querySelector(".pageTop-content");

async function loadTop(param) {
    const sections = topContent.querySelectorAll(".section");
    const response = await fetch(`${endpoint}${param}`);
    const { data } = await response.json();

    for (let i = 0; i < [...sections].length; i++) {
        getListSong(data[i], sections[i], topContent);
    }
}

function getListSong(item, section, content, limit = false) {
    const heading = document.createElement("h2");
    heading.className = "section__heading";
    heading.textContent = item.title;
    section.appendChild(heading);

    const list = document.createElement("div");
    list.className = "section-list";

    // aReArtist
    console.log(item);
    // const len = Math.min(5, item.items.length);
    const len = item.items.length;
    for (let i = 0; i < len; i++) {
        const song = item.items[i];
        list.insertAdjacentHTML(
            "beforeend",
            loadSectionListItem(song, song.artists)
        );
    }

    section.appendChild(list);
    content.append(section);
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
