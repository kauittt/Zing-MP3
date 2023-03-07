const endpoint = `https://apizingmp3.vercel.app/api/`;

const content = document.querySelector(".content");

const pages = document.querySelectorAll("div[data-page]");
function findIdPage(arr, page) {
    return [...arr].findIndex((item) => {
        console.log(item.dataset.page == page);
        item.dataset.page == page;
    });
}

let pageShowing = pages[findIdPage(pages, 0)];
// console.log(findIdPage(pages, 0));
console.log(pageShowing);

loadAll();

async function loadAll() {
    pages[3].style.display = "flex";
    await loadSections();

    pages[3].style.display = "none";
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
                if (!topContent.querySelector(".section-list-item")) {
                    pages[3].style.display = "flex";
                    await loadTop("top100");
                    pages[3].style.display = "none";
                }
                break;
            default:
        }
    });
}

//! Content

//? Section
let sectionsId = 0;
const sections = document.querySelectorAll(".section");
[...sections].forEach((item) => {
    item.addEventListener("click", handleItemClick);
});
async function loadSections() {
    const response = await fetch(`https://zing-mp3-api.vercel.app/api/home`);
    const { data } = await response.json();
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
                list.className = `section-list ${
                    item.type == "song" ? "section-song" : ""
                }`;
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
                        <div> 
                            <h3 class="section-list-item__heading">
                                ${itemChild.title}
                            </h3>
                            <p class="section-list-item__desc">
                                ${itemChild.sortDescription}
                            </p>
                        </div>
                    </div>`;
                    list.insertAdjacentHTML("beforeend", template);
                    if (i == 13) {
                        list.lastChild.querySelector(
                            ".section-list-item__desc"
                        ).textContent = "";
                        loadSingers(
                            itemChild.album.artists,
                            list.lastChild.querySelector(
                                ".section-list-item__desc"
                            )
                        );
                    }
                }

                sections[sectionsId] && sections[sectionsId].appendChild(list);
                sectionsId++;
                break;
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

    let item = document.createElement("div");

    const template2 = `
    <div class="playList-wrapper-item-img" data-id="${data.encodeId}">
        <img
            src="${data.thumbnailM}"
            alt=""
        />
        <div class="layer">
            <i class="fa-regular fa-circle-play"></i>
        </div>
    </div>
    <div class="playList-wrapper-item-song">
        <h3 class="playList-wrapper-item-song__name">
        ${data.title}
        </h3>
        <p class="playList-wrapper-item-song__singer">
        </p>
    </div>
`;
    item.insertAdjacentHTML("beforeend", template2);

    data.album &&
        loadSingers(
            data.album.artists,
            item.querySelector(".playList-wrapper-item-song__singer")
        );

    await handlePlayMusic(item.querySelector(".playList-wrapper-item-img"));
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

let mp3 = new Audio();
//! handle itemmmmmmmmmmmmmmmmmmmmm
async function handleItemClick(e, id = null) {
    const key = id;
    if (!id) {
        const heading = e.target.closest(".section-list-item-img");
        const img = e.target.closest(".section-list-item__heading");
        if (!heading && !img) {
            return;
        }
        id =
            e.target.closest(".section-list-item") &&
            e.target.closest(".section-list-item").dataset.id;
    }
    pages[3].style.display = "flex";

    if (
        !key &&
        e.target.closest(".section-list").classList.contains("section-song")
    ) {
        handlePlayMusic(e.target.closest(".section-list-item"));
        pages[3].style.display = "none";

        return;
    }

    const response = await fetch(
        `https://zing-mp3-api.vercel.app/api/playlist/${id}`
    );
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

    wrapList.innerHTML = "";
    data.song.items.forEach((item) => {
        wrapList.insertAdjacentHTML("beforeend", loadListContent(item, false));
    });
    pages[3].style.display = "none";
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
<h3 class="listSong-infor__heading">
${data.title}
</h3>
<p class="listSong-infor__date">Cập nhật: ${time}</p>
<p class="listSong-infor__singers">
</p>
<p class="listSong-infor__liked"><span>${data.like}</span> người yêu thích</p>

<div class="listSong-infor__btn">
    <i class="fa-regular fa-circle-pause"></i>
    TẠM DỪNG
</div>`;
    return template;
}

function loadListContent(data, flag = true) {
    let minute = Math.floor(data.duration / 60);
    let second = "0" + (data.duration % 60);
    second = second.slice(-2);

    let item = document.createElement("div");
    item.className = "listSong-content-list-item";
    item.setAttribute("data-id", data.encodeId);

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
            <h3
                class="listSong-content-list-item-infor-song__name"
            >
                ${data.title}
            </h3>
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

    const template2 = `<div class="playList-wrapper-item" data-id="${data.encodeId}">
    <div class="playList-wrapper-item-img" data-id="${data.encodeId}">
        <img
            src="${data.thumbnailM}"
            alt=""
        />
        <div class="layer">
                                    <i class="fa-regular fa-circle-play"></i>
                                </div>
    </div>
    <div class="playList-wrapper-item-song">
        <h3 class="playList-wrapper-item-song__name">
        ${data.title}
        </h3>
        <p class="playList-wrapper-item-song__singer">
        </p>
    </div>
</div>`;
    // if (!flag) return template2;
    item.insertAdjacentHTML("beforeend", flag ? template : template2);

    data.album &&
        loadSingers(
            data.album.artists,
            flag
                ? item.querySelector(
                      ".listSong-content-list-item-infor-song__singer"
                  )
                : item.querySelector(".playList-wrapper-item-song__singer")
        );
    return flag ? item : item.innerHTML;
}

let songPlaying = null;

// listSong_content.addEventListener("click", async function (e) {
//     if (e.target.closest(".listSong-content-list-item-infor-img")) {
//         const item = e.target.closest(".listSong-content-list-item-infor-img");

//         songPlaying &&
//             songPlaying.parentNode.parentNode.classList.remove("selected");
//         songPlaying = item;
//         songPlaying.parentNode.parentNode.classList.add("selected");

//         wrapListSongPlaying && wrapListSongPlaying.classList.remove("selected");
//         wrapListSongPlaying = wrapList.querySelector(
//             `div[data-id="${songPlaying.dataset.id}"]`
//         ).parentNode;
//         wrapListSongPlaying.classList.add("selected");

//         time.value = 0;
//         mp3.currentTime = 0;
//         mp3.pause();
//         if (!btns[2].classList.contains("fa-circle-pause")) {
//             btns[2].classList.add("fa-circle-pause");
//             btns[2].classList.remove("fa-circle-play");
//         }
//         play.querySelector(".play-main-time__total").textContent =
//             item.parentNode.nextElementSibling.nextElementSibling.textContent;
//         play.classList.add("show");

//         await handlePlayMusic(
//             e.target.closest(".listSong-content-list-item-infor-img")
//         );
//     }
// });

//! play musicccccccccccccccccccccccc
async function handlePlayMusic(item) {
    const id = item.dataset.id;
    const title = item.parentNode.querySelector("h3");
    const desc = item.parentNode.querySelector("p");

    const img = document.querySelector(".play-infor-img img");
    const heading = document.querySelector(".play-infor-song__name");
    const singers = document.querySelector(".play-infor-song__singer");

    img.setAttribute("src", item.querySelector("img").getAttribute("src"));
    img.setAttribute("data-id", item.getAttribute("data-id"));

    heading.textContent = title.textContent;
    heading.setAttribute("data-id", item.getAttribute("data-id"));

    singers.innerHTML = "";
    singers.innerHTML = desc.innerHTML;

    const response = await fetch(
        `https://zing-mp3-api.vercel.app/api/song/${id}`
    );
    const { data } = await response.json();

    if (!data) {
        error.classList.add("show");
        return;
    }
    //? prepare
    mp3.src = data["128"];

    mp3.addEventListener("loadedmetadata", function (e) {
        mp3.play();
        displayPlay();
    });
}

listSong_infor.addEventListener("click", function (e) {
    if (e.target.matches(".listSong-infor__btn")) {
        const listSongBtn = document.querySelector(".listSong-infor__btn i");
        listSongBtn.classList.toggle("fa-circle-pause");
        listSongBtn.classList.toggle("fa-circle-play");
        listSongBtn.classList.contains("fa-circle-pause")
            ? mp3.play()
            : mp3.pause();
    }
});
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

//! Play
const play = document.querySelector(".play");
const btns = document.querySelectorAll(".play-main-list i");
const volume = document.querySelector(".play-menu-volume__input");
const volumeIcon = volume.previousElementSibling;
const time = document.querySelector(".play-main-time__drag");
let volumeValue = 1;

time.addEventListener("input", function (e) {
    const percent = (mp3.currentTime / mp3.duration) * 100;
    const progress = `linear-gradient(90deg, #d14781 ${percent}%, #e0b2b1 ${percent}%)`;
    time.style.background = progress;

    mp3.currentTime = e.target.value;
});

btns[0].addEventListener("click", function (e) {
    if (!listSong_content.querySelector(".listSong-content-list-item")) return;

    const list = listSong_content.querySelector(".listSong-content-list");
    let min = 2;
    const children = list.children.length;

    const random = Math.floor(Math.random() * (children - min + 1) + min);

    list.querySelector(`:nth-child(${random})`)
        .querySelector(".listSong-content-list-item-infor-img")
        .click();
});
btns[1].addEventListener("click", function (e) {
    const now = songPlaying.parentNode.parentNode;
    if (
        !now.previousElementSibling.classList.contains(
            "listSong-content-list-item"
        )
    ) {
        return;
    }
    now.classList.remove("selected");
    songPlaying = now.previousElementSibling.querySelector(
        ".listSong-content-list-item-infor-img"
    );
    now.previousElementSibling.classList.add("selected");

    wrapListSongPlaying.classList.remove("selected");
    wrapListSongPlaying = wrapList.querySelector(
        `div[data-id="${songPlaying.dataset.id}"]`
    ).parentNode;
    wrapListSongPlaying.classList.add("selected");

    songPlaying.click();
});
btns[2].addEventListener("click", function (e) {
    btns[2].classList.toggle("fa-circle-pause");
    btns[2].classList.toggle("fa-circle-play");
    btns[2].classList.contains("fa-circle-pause") ? mp3.play() : mp3.pause();
});
btns[3].addEventListener("click", function (e) {
    const now = songPlaying.parentNode.parentNode;
    now.classList.remove("selected");
    songPlaying = now.nextElementSibling.querySelector(
        ".listSong-content-list-item-infor-img"
    );
    now.nextElementSibling.classList.add("selected");

    wrapListSongPlaying.classList.remove("selected");
    wrapListSongPlaying = wrapList.querySelector(
        `div[data-id="${songPlaying.dataset.id}"]`
    ).parentNode;
    wrapListSongPlaying.classList.add("selected");

    songPlaying.click();
});

btns[4].addEventListener("click", function (e) {
    if (!listSong_content.querySelector(".listSong-content-list-item")) return;

    const list = listSong_content.querySelector(".listSong-content-list");

    list.querySelector(`.listSong-content-list-item:nth-child(2)`)
        .querySelector(".listSong-content-list-item-infor-img")
        .click();
});

volumeIcon.addEventListener("click", function (e) {
    volumeIcon.classList.toggle("fa-volume-xmark");
    volumeIcon.classList.toggle("fa-volume-hight");

    let progress = 0;
    if (volumeIcon.classList.contains("fa-volume-xmark")) {
        mp3.volume = 0;
        volume.value = 0;
        progress = `linear-gradient(90deg, #d14781 ${0}%, #e0b2b1 ${0}%)`;
    } else {
        mp3.volume = volumeValue;
        volume.value = volumeValue * 100;
        progress = `linear-gradient(90deg, #d14781 ${volume.value}%, #e0b2b1 ${volume.value}%)`;
    }

    volume.style.background = progress;
});
volume.addEventListener("input", function (e) {
    const value = e.target.value;
    const progress = `linear-gradient(90deg, #d14781 ${value}%, #e0b2b1 ${value}%)`;
    volume.style.background = progress;

    const icon = e.target.previousElementSibling;

    volumeValue = value / 100;
    mp3.volume = volumeValue;

    value == 0
        ? (icon.className = "fa-solid fa-volume-xmark")
        : (icon.className = "fa-solid fa-volume-high");
});

function displayPlay() {
    time.max = mp3.duration;
    time.nextElementSibling.textContent = formatTime(mp3.duration);
    time.previousElementSibling = "0:00";

    play.classList.add("show");
    const timer = setInterval(displayTime, 1000);
}

function displayTime() {
    const { duration, currentTime } = mp3;
    time.value = currentTime;
    time.previousElementSibling.textContent = formatTime(currentTime);

    const percent = (currentTime / duration) * 100;
    const progress = `linear-gradient(90deg, #d14781 ${percent}%, #e0b2b1 ${percent}%)`;
    time.style.background = progress;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    time %= 60;
    const seconds = Math.floor(time);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

//! playList
const playListIcon = document.querySelector(".play-menu>i");
const playList = document.querySelector(".playList");
const wrapList = document.querySelector(".playList-wrapper");
let wrapListSongPlaying = null;

wrapList.addEventListener("wheel", function (e) {
    e.preventDefault();
    const delta = e.deltaY;

    wrapList.scrollTop += delta;
});
wrapList.addEventListener("click", async function (e) {
    if (e.target.closest(".playList-wrapper-item-img")) {
        const item = e.target.closest(".playList-wrapper-item");

        wrapListSongPlaying && wrapListSongPlaying.classList.remove("selected");
        wrapListSongPlaying = item;
        wrapListSongPlaying.classList.add("selected");

        songPlaying && songPlaying.classList.remove("selected");
        songPlaying = listSong_content.querySelector(
            `div[data-id="${item.dataset.id}"]`
        );
        songPlaying.classList.add("selected");

        await handlePlayMusic(e.target.closest(".playList-wrapper-item-img"));

        // songPlaying = listSong_content.querySelector(
        //     `div[data-id="${
        //         e.target.closest(".playList-wrapper-item-img").dataset.id
        //     }"`
        // );
    }
});

listSong_content.addEventListener("click", async function (e) {
    if (e.target.closest(".listSong-content-list-item-infor-img")) {
        // const item = e.target.closest(".listSong-content-list-item-infor-img");
        const item = e.target.closest(".listSong-content-list-item");

        songPlaying && songPlaying.classList.remove("selected");
        songPlaying = item;
        songPlaying.classList.add("selected");

        wrapListSongPlaying && wrapListSongPlaying.classList.remove("selected");
        wrapListSongPlaying = wrapList.querySelector(
            `div[data-id="${songPlaying.dataset.id}"]`
        );
        wrapListSongPlaying.classList.add("selected");

        time.value = 0;
        mp3.currentTime = 0;
        mp3.pause();
        if (!btns[2].classList.contains("fa-circle-pause")) {
            btns[2].classList.add("fa-circle-pause");
            btns[2].classList.remove("fa-circle-play");
        }
        play.querySelector(".play-main-time__total").textContent =
            item.querySelector(".listSong-content-list-item__time").textContent;
        play.classList.add("show");

        await handlePlayMusic(
            e.target.closest(".listSong-content-list-item-infor-img")
        );
    }
});

playListIcon.addEventListener("click", handlePlayListDisplay);

// const logo = document.querySelector(".nav-logo");
// logo.addEventListener("click", function (e) {
//     displayPlay();
// });

function handlePlayListDisplay(e) {
    playList.classList.toggle("show");
}

//! error
const error = document.querySelector(".error");
error.addEventListener("click", function (e) {
    if (e.target.matches(".error")) {
        error.classList.remove("show");
    }
});

error.querySelector("i").addEventListener("click", function (e) {
    error.classList.remove("show");
});
