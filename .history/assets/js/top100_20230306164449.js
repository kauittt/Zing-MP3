//! pageTop
const topContent = document.querySelector(".pageTop-content");

async function loadTop(param) {
    const sections = topContent.querySelectorAll(".section");
    const response = await fetch(`${endpoint}${param}`);
    const { data } = await response.json();

    for (let i = 0; i < [...sections].length; i++) {
        getListSong(data[i], sections[i]);
    }
}

function getListSong(item, section) {
    const heading = document.createElement("h2");
    heading.className = "section__heading";
    heading.textContent = item.title;
    section.appendChild(heading);

    const list = document.createElement("div");
    list.className = "section-list";

    item.items.forEach((item) => {
        //! listItem
        list.insertAdjacentHTML("beforeend", loadItem(item));
    });
    section.appendChild(list);
    topContent.append(section);
}

function loadItem(item) {
    const div = document.createElement("div");

    const template = `
            <div class="section-list-item" data-id="${item.encodeId}">
                <div class="section-list-item-img" ">
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

                <div>
                    <h3 class="section-list-item__heading ">
                        ${item.title}
                    </h3>
                    <p class="section-list-item__desc">
                    </p>
                </div>
            </div>
`;
    div.insertAdjacentHTML("beforeend", template);

    loadSingers(item.artists, div.querySelector(".section-list-item__desc"));

    return div.innerHTML;
}
