async function handlePlayMusic(imgItem) {
    const id = imgItem.dataset.id;
    const title = imgItem.parentNode.querySelector("h3");
    const desc = imgItem.parentNode.querySelector("p");

    //*? load info
    const img = document.querySelector(".play-infor-img img");
    const heading = document.querySelector(".play-infor-song__name");
    const singers = document.querySelector(".play-infor-song__singer");

    img.setAttribute("src", imgItem.querySelector("img").getAttribute("src"));
    img.setAttribute("data-id", imgItem.getAttribute("data-id"));

    heading.textContent = title.textContent;
    heading.setAttribute("data-id", imgItem.getAttribute("data-id"));

    singers.innerHTML = "";
    singers.innerHTML = desc.innerHTML;

    const response = await fetch(
        `https://zing-mp3-api.vercel.app/api/song/${id}`
    );
    const { data } = await response.json();

    if (!data) {
        showVip();
        return;
    }

    //? prepare
    mp3.src = data["128"];

    mp3.addEventListener("loadedmetadata", function (e) {
        mp3.play();
        showPlay();
    });
}

function loadSingers(artists, selector) {
    if (!artists) return;

    artists.forEach((artist) => {
        const template = `<span data-name="${artist.alias}">${artist.name}, </span>`;
        selector.insertAdjacentHTML("beforeend", template);
    });

    //? remove ", "
    selector.lastChild.textContent = selector.lastChild.textContent.slice(
        0,
        -2
    );
}
let mp3 = new Audio();

//! playMenu
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

function clickRandom(list, position) {
    list.querySelector(`:nth-child(${position})`)
        .querySelector(".listSong-content-list-item-infor-img")
        .click();
}
btns[0].addEventListener("click", function (e) {
    if (!listSong_content.querySelector(".listSong-content-list-item")) return;

    const list = listSong_content.querySelector(".listSong-content-list");
    let min = 2;
    const children = list.children.length;

    const random = Math.floor(Math.random() * (children - min + 1) + min);

    clickRandom(list, random);
});
btns[4].addEventListener("click", function (e) {
    if (!listSong_content.querySelector(".listSong-content-list-item")) return;

    const list = listSong_content.querySelector(".listSong-content-list");

    clickRandom(list, 2);
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

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    time %= 60;
    const seconds = Math.floor(time);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}
function timer() {
    const { duration, currentTime } = mp3;
    time.value = currentTime;
    time.previousElementSibling.textContent = formatTime(currentTime);

    const percent = (currentTime / duration) * 100;
    const progress = `linear-gradient(90deg, #d14781 ${percent}%, #e0b2b1 ${percent}%)`;
    time.style.background = progress;
}
function showPlay() {
    time.max = mp3.duration;
    time.nextElementSibling.textContent = formatTime(mp3.duration);
    time.previousElementSibling = "0:00";

    play.classList.add("show");
    const timer = setInterval(timer, 1000);
}

//! playList
const playListIcon = document.querySelector(".play-menu>i");
const playList = document.querySelector(".playList");
const wrapList = document.querySelector(".playList-wrapper");
let wrapListSongPlaying = null;
let songPlaying = null;

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

playListIcon.addEventListener("click", handlePlayListDisplay);

function handlePlayListDisplay(e) {
    playList.classList.toggle("show");
}
