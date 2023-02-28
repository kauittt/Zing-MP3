const endpoint = `https://apizingmp3.vercel.app/api/`;

//! Drag
const drag = document.querySelector(".play-main-time__drag");
drag.addEventListener("input", function (e) {
    const value = e.target.value;
    const progress = `linear-gradient(90deg, #d14781 ${value}%, #e0b2b1 ${value}%)`;
    drag.style.background = progress;
});

//! Content
const content = document.querySelector(".content");
const sections = document.querySelectorAll(".section");
const sliderList = document.querySelector(".slider-list");
const navMainPage = document
    .querySelector(".nav-category")
    .querySelector(":nth-child(2)");

navMainPage.addEventListener("click", function (e) {
    content.style.display = "block";
    top100.parentNode.style.display = "none";
});

const nextBtn = document.querySelector(".slider__next");
const prevBtn = document.querySelector(".slider__prev");

let sectionsId = 0;

//? Content - Slider
function handleBtnClick(direction) {
    if (!sliderList.querySelector(".slider-list-item")) return;

    const sliderScrollWidth =
        Math.floor(sliderList.scrollWidth - sliderList.clientWidth) - 1;

    sliderList.scrollLeft +=
        direction *
        (sliderList.querySelector(".slider-list-item").offsetWidth + 20);

    handleIcon(
        sliderScrollWidth,
        sliderList.scrollLeft +
            direction *
                (sliderList.querySelector(".slider-list-item").offsetWidth + 20)
    );
}

function handleIcon(scrollWidth, scrollLeft) {
    scrollLeft <= 0
        ? prevBtn.classList.add("hide")
        : prevBtn.classList.remove("hide");

    scrollLeft >= scrollWidth
        ? nextBtn.classList.add("hide")
        : nextBtn.classList.remove("hide");
}

async function handleSliderClick(e) {
    const id = e.target.closest(".slider-list-item").dataset.id;

    const response = await fetch(`${endpoint}infosong?id=${id}`);
    const { data } = await response.json();

    if (!data) {
        handleItemClick(null, id);
        return;
    }
    console.log("song");
}

async function loadSections() {
    const response = await fetch(`https://zing-mp3-api.vercel.app/api/home`);
    const { data } = await response.json();
    // console.log(data);

    for (let i = 0; i <= 14; i++) {
        switch (i) {
            case 0:
                const sliders = data.items[i];

                sliders.items.forEach((item) => {
                    const template = `<div class="slider-list-item" data-id="${item.encodeId}">
                    <img
                        src="${item.banner}"
                        alt=""
                        class="slider-list-item__img"
                    />
                </div>`;

                    sliderList.insertAdjacentHTML("beforeend", template);
                });

                break;

            case 2:
            case 3:
            case 4:
            case 5:
            case 7:
            case 11:
            case 13:
            case 14:
                const item = data.items[i];

                sections[sectionsId] &&
                    sections[sectionsId].insertAdjacentHTML(
                        "beforeend",
                        `<h2 class="section__heading">${
                            i == 14 ? "Album" : item.title
                        }</h2>`
                    );

                const list = document.createElement("div");
                list.className = `section-list`;
                if (i == 2 || i == 3) {
                    sectionsId++;
                    continue;
                }
                for (let a = 0; a < 5; a++) {
                    const itemChild = item.items[a];
                    const template = `
                    <div class="section-list-item" data-id="${itemChild.encodeId}">
                        <div class="section-list-item-img">
                            <img
                                src="${itemChild.thumbnailM}"
                                alt=""
                            />
                            <div class="layer">
                                <i
                                    class="fa-regular fa-circle-play"
                                ></i>
                            </div>
                        </div>
                        <h3 class="section-list-item__heading">
                            ${itemChild.title}
                        </h3>
                        <p class="section-list-item__desc">
                            ${itemChild.sortDescription}
                        </p>
                    </div>`;
                    list.insertAdjacentHTML("beforeend", template);

                    if (i == 13) {
                        list.lastChild.querySelector(
                            ".section-list-item__desc"
                        ).textContent = "";
                        loadSingers(itemChild.album.artists, list.lastChild);
                    }
                }

                sections[sectionsId] && sections[sectionsId].appendChild(list);
                sectionsId++;
                break;

            default:
                break;
        }
    }
}

nextBtn.addEventListener("click", function (e) {
    handleBtnClick(1);
});
prevBtn.addEventListener("click", function (e) {
    handleBtnClick(-1);
});
sliderList.addEventListener("click", handleSliderClick);
loadSections();

//! listSong
const listSong = document.querySelector(".listSong");
const listSong_content = document.querySelector(".listSong-content");
const listSong_infor = document.querySelector(".listSong-infor");

[...sections].forEach((item) => {
    item.addEventListener("click", handleItemClick);
});

async function handleItemClick(e, id = null) {
    if (!id) {
        id = e.target.closest(".section-list-item").dataset.id;
    }

    const response = await fetch(`${endpoint}detailplaylist?id=${id}`);
    const { data } = await response.json();

    content.style.display = "none";
    listSong.style.display = "flex";

    listSong_infor.insertAdjacentHTML("beforeend", loadListInfor(data));
    loadSingers(
        data.artists,
        document.querySelector(".listSong-infor__singers")
    );

    data.song.items.forEach((item) => {
        listSong_content
            .querySelector(".listSong-content-list")
            .appendChild(loadListContent(item));
    });
}

function loadSingers(data, selector) {
    data.forEach((item) => {
        const template = `<span data-name="${item.alias}">${item.name}, </span>`;
        selector.insertAdjacentHTML("beforeend", template);
    });
    selector.lastChild.textContent = selector.lastChild.textContent.slice(
        0,
        -2
    );
}

function loadListInfor(data) {
    const template = `<div class="listSong-infor-img">
    <img
        src="${data.thumbnailM}"
        alt=""
    />
    <div class="layer">
                                    <i class="fa-regular fa-circle-play"></i>
                                </div>
</div>
<h2 class="listSong-infor__heading">
${data.title}
</h2>
<p class="listSong-infor__date">Cập nhật: 26/02/2023</p>
<p class="listSong-infor__singers">
</p>
<p class="listSong-infor__liked"><span>${data.like}</span> người yêu thích</p>

<div class="listSong-infor__btn">
    <i class="fa-solid fa-pause"></i>
    TẠM DỪNG
</div>`;
    return template;
}

function loadListContent(data) {
    let minute = Math.floor(data.duration / 60);
    let second = "0" + (data.duration % 60);
    second = second.slice(-2);

    let item = document.createElement("div");
    item.className = "listSong-content-list-item";

    const template = `
    <div class="listSong-content-list-item-infor">
        <i class="fa-solid fa-music"></i>
        <div
            class="listSong-content-list-item-infor-img"
        >
            <img
                src="${data.thumbnailM}"
                alt=""
            />
            <div class="layer">
                                    <i class="fa-regular fa-circle-play"></i>
                                </div>
        </div>

        <div
            class="listSong-content-list-item-infor-song"
        >
            <p
                class="listSong-content-list-item-infor-song__name"
            >
                ${data.title}
            </p>
            <p
                class="listSong-content-list-item-infor-song__singer"
            >
            </p>
        </div>
    </div>

    <p class="listSong-content-list-item__album" data-id="${
        data.album && data.album.encodeId
    }">
        ${data.title}
    </p>
    <p class="listSong-content-list-item__time">
        ${minute}:${second}
    </p>
`;
    item.insertAdjacentHTML("beforeend", template);

    data.album &&
        loadSingers(
            data.album.artists,
            item.querySelector(".listSong-content-list-item-infor-song__singer")
        );
    return item;
}

//! pageTop100
const top100 = document.querySelector(".pageTop100-content");
const sectionsWrap = document.querySelector(".pageTop100-content");
console.log(sectionsWrap);

const navLink = document
    .querySelector(".nav-music")
    .querySelector(":nth-child(3)");

navLink.addEventListener("click", handleTop100LinkClick);

function handleTop100LinkClick(e) {
    content.style.display = "none";
    top100.parentNode.style.display = "block";
    if (!top100.querySelector(".section-wrap")) {
        loadSection("top100");
    }
}

async function loadSection(param) {
    const response = await fetch(`${endpoint}${param}`);
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
                <h3 class="section-list-item__heading ">
                    ${item.title}
                </h3>
                <p class="section-list-item__desc">
                    ${singers}}
                </p>
            </div>
`;
    return template;
}
