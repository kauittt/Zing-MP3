const endpoint = `https://apizingmp3.vercel.app/api/top100`;
const top100 = document.querySelector(".top100");

loadSection();

async function loadSection() {
    const response = await fetch(endpoint);
    const { data } = await response.json();
    [...data].forEach((item) => {
        //! section
        const section = document.createElement("div");
        section.className = "section-wrap";
        getListSong(item, section);
    });
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
    top100.append(section);
}

function loadItem(item) {
    let singers = "";
    item.artists.forEach((item) => {
        singers += item.name + ", ";
    });
    singers = singers.slice(0, -2);
    const template = `
        <a href="#!">
            <div class="section-list-item">
                <div class="section-list-item-img" data-id="${item.encodeId}">
                    <img
                        src="${item.thumbnail}"
                        alt=""
                    />
                    <div
                        class="section-list-item-img__layer"
                    >
                        <i
                            class="fa-regular fa-circle-play"
                        ></i>
                    </div>
                </div>
                <h3 class="section-list-item__heading data-id="${item.encodeId}">
                    ${item.title}
                </h3>
                <p class="section-list-item__desc">
                    ${singers}}
                </p>
            </div>
        </a>
`;
    return template;
}

top100.addEventListener("click", handleItemClick);

async function handleItemClick(e) {
    console.log(e.target);
}
