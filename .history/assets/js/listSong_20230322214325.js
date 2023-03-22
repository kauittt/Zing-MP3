//! listSong
const listSong = document.querySelector(".listSong");
const listSong_content = document.querySelector(".listSong-content");
const listSong_infor = document.querySelector(".listSong-infor");

//! handle itemmmmmmmmmmmmmmmmmmmmm
async function handleItemClick(e, id = null) {
    console.log("handleItemClick");
    const key = id;
    if (!id) {
        const heading = e.target.closest(".section-list-item-img");
        const img = e.target.closest(".section-list-item__heading");
        if (!heading && !img) {
            return;
        }
        id = e.target.closest(".section-list-item").dataset.id;
    }
    showLoading();

    const response = await fetch(
        `https://zing-mp3-api.vercel.app/api/playlist/${id}`
    );
    const { data } = await response.json();

    displayPage(1);
    pageShowing = pages[findIdPage(1)];

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
        wrapList.appendChild(
            loadListContent(item, false, false, "playList", "playList-wrapper")
        );
    });

    hideLoading();
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

function loadListContent(
    data,
    album = true,
    time = true,
    type = "listSong",
    query = "listSong-content-list"
) {
    //listSong, playList, zingChart,....

    let item = document.createElement("div");
    item.className = `${query}-item general-item`;
    item.setAttribute("data-id", data.encodeId);

    const infor = `
    <div class="${query}-item-infor general-item-infor">
    ${
        type == "zingChart"
            ? `<span
        class="general-item-infor__rank ${query}-item-infor__rank"
        ></span
        >`
            : `<i class="fa-solid fa-music"></i>`
    }
        
        <div
            class="${query}-item-infor-img general-item-infor-img" data-id="${
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
            class="${query}-item-infor-song general-item-infor-song"
        >
            <h3
                class="${query}-item-infor-song__name general-item-infor-song__name"
            >
                ${data.title}
            </h3>
            <p
                class="${query}-item-infor-song__singer general-item-infor-song__singer"
            >
            </p>
        </div>
    </div>
`;
    item.insertAdjacentHTML("beforeend", infor);

    data.album &&
        loadSingers(
            data.album.artists,
            item.querySelector(`.${query}-item-infor-song__singer`)
        );

    if (album) {
        item.insertAdjacentHTML(
            "beforeend",
            `
            <p class="${query}-item__album general-item__album" data-id="${
                data.album && data.album.encodeId
            }">
                ${data.title}
            </p>
        `
        );
    }

    if (time) {
        let minute = Math.floor(data.duration / 60);
        let second = "0" + (data.duration % 60);
        second = second.slice(-2);

        item.insertAdjacentHTML(
            "beforeend",
            `
            <p class="${query}-item__time general-item__time">
            ${minute}:${second}
        </p>
        `
        );
    }

    return item;
}

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

//! playList
const playListIcon = document.querySelector(".play-menu>i");
const playList = document.querySelector(".playList");
const wrapList = document.querySelector(".playList-wrapper");

wrapList.addEventListener("wheel", function (e) {
    e.preventDefault();
    const delta = e.deltaY;

    wrapList.scrollTop += delta;
});
wrapList.addEventListener("click", async function (e) {
    if (e.target.closest(".playList-wrapper-item-infor-img")) {
        const item = e.target.closest(".playList-wrapper-item");

        wrapListSongPlaying && wrapListSongPlaying.classList.remove("selected");
        wrapListSongPlaying = item;
        wrapListSongPlaying.classList.add("selected");

        songPlaying && songPlaying.classList.remove("selected");
        songPlaying = listSong_content.querySelector(
            `div[data-id="${item.dataset.id}"]`
        );
        songPlaying.classList.add("selected");

        songPlaying
            .querySelector(".listSong-content-list-item-infor-img")
            .click();
    }
});

playListIcon.addEventListener("click", handlePlayListDisplay);

function handlePlayListDisplay(e) {
    playList.classList.toggle("show");
}
