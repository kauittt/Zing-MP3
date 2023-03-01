const endpoint = `https://apizingmp3.vercel.app/api/`;

const pages = document.querySelectorAll("div[data-page]");
console.log(pages);

loadAll();

async function loadAll() {
    await loadSections();
    // await loadSection("top100");
}

//! Nav
const navLinks = document.querySelectorAll(".nav h2[data-nav]");
let navSelected = 1;

for (let i = 0; i < [...navLinks].length; i++) {
    const item = navLinks[i];
    item.addEventListener("click", async function (e) {
        navLinks[navSelected].classList.remove("nav-category__item--selected");
        item.classList.add("nav-category__item--selected");
        navSelected = item.dataset.nav;

        switch (navSelected) {
            case "1":
                [...pages].forEach((item) => {
                    item.style.display = "none";
                });

                pages[0].style.display = "block";
                break;
            case "7":
                [...pages].forEach((item) => {
                    item.style.display = "none";
                });

                pages[2].style.display = "block";
                !topContent.querySelector(".section-list-item") &&
                    (await loadSection("top100"));

                break;
            default:
        }
    });
}

//! Content
const content = document.querySelector(".content");

//? Section
let sectionsId = 0;
const sections = document.querySelectorAll(".section");
[...sections].forEach((item) => {
    item.addEventListener("click", handleItemClick);
});
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
        }

        if (i == 11) {
            loadTop(data.items[11]);
            l;
            console.log(data.items[11]);
        }
    }
}
//? ===Section===

//? Slider
const sliderList = document.querySelector(".slider-list");
const nextBtn = document.querySelector(".slider__next");
const prevBtn = document.querySelector(".slider__prev");
async function handleSliderClick(e) {
    const id = e.target.closest(".slider-list-item").dataset.id;

    const response = await fetch(`${endpoint}infosong?id=${id}`);
    const { data } = await response.json();

    if (!data) {
        await handleItemClick(null, id);
        return;
    }

    console.log("song");
    handlePlayMusic(id);
}
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
nextBtn.addEventListener("click", function (e) {
    handleBtnClick(1);
});
prevBtn.addEventListener("click", function (e) {
    handleBtnClick(-1);
});
sliderList.addEventListener("click", handleSliderClick);
//? ===Slider===

//! listSong
const listSong = document.querySelector(".listSong");
const listSong_content = document.querySelector(".listSong-content");
const listSong_infor = document.querySelector(".listSong-infor");

async function handleItemClick(e, id = null) {
    if (!id) {
        id =
            e.target.closest(".section-list-item") &&
            e.target.closest(".section-list-item").dataset.id;
    }

    const response = await fetch(`${endpoint}detailplaylist?id=${id}`);
    const { data } = await response.json();

    [...pages].forEach((item) => {
        item.style.display = "none";
    });
    pages[1].style.display = "flex";

    listSong_infor.innerHTML = "";
    listSong_content.innerHTML = "";

    listSong_infor.insertAdjacentHTML("beforeend", loadListInfor(data));

    loadSingers(
        data.artists,
        document.querySelector(".listSong-infor__singers")
    );

    listSong_content.insertAdjacentHTML(
        "beforeend",
        `<p class="listSong-content__desc">${data.sortDescription}
</p>
<div class="listSong-content-list">
                        <div class="listSong-content-list-heading">
                            <p class="listSong-content-list-heading__title">
                                <i class="fa-solid fa-list"></i>
                                BÀI HÁT
                            </p>
                            <p class="listSong-content-list-heading__title">
                                ALBUM
                            </p>
                            <p class="listSong-content-list-heading__title">
                                THỜI GIAN
                            </p>
                        </div>
                    </div>`
    );
    data.song.items.forEach((item) => {
        listSong_content
            .querySelector(".listSong-content-list")
            .appendChild(loadListContent(item));
    });
}

function loadSingers(data, selector) {
    if (!data) return;

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
    const date = new Date(data.contentLastUpdate * 1000);
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth()}`.slice(-2);

    const time = `${day}/${month}/${date.getFullYear()}`;

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
<p class="listSong-infor__date">Cập nhật: ${time}</p>
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
    // console.log(data);

    let item = document.createElement("div");
    item.className = "listSong-content-list-item";

    const template = `
    <div class="listSong-content-list-item-infor">
        <i class="fa-solid fa-music"></i>
        <div
            class="listSong-content-list-item-infor-img" data-id="${
                data.encodeId
            }"
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

listSong_content.addEventListener("click", async function (e) {
    e.target.closest(".listSong-content-list-item-infor-img") &&
        (await handlePlayMusic(
            e.target.closest(".listSong-content-list-item-infor-img").dataset.id
        ));
});

async function handlePlayMusic(id) {
    console.log("playmucsic");
    const response = await fetch(
        `https://zing-mp3-api.vercel.app/api/song/${id}`
    );
    const { data } = await response.json();

    if (!data) {
        console.log("err");
        return;
    }

    console.log("work");
    displayPlay();
}

//! pageTop
const topContent = document.querySelector(".pageTop-content");

async function loadTop(data) {
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

//! Drag
const drag = document.querySelector(".play-main-time__drag");
drag.addEventListener("input", function (e) {
    const value = e.target.value;
    const progress = `linear-gradient(90deg, #d14781 ${value}%, #e0b2b1 ${value}%)`;
    drag.style.background = progress;
});

//! Play
const play = document.querySelector(".play");

function displayPlay() {
    play.classList.add("show");
}
