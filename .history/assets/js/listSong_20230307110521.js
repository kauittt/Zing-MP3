//! listSong
const listSong = document.querySelector(".listSong");
const listSong_content = document.querySelector(".listSong-content");
const listSong_infor = document.querySelector(".listSong-infor");

//! handle itemmmmmmmmmmmmmmmmmmmmm
async function handleItemClick(e, id = null) {
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

    if (!key) {
        handlePlayMusic(e.target.closest(".section-list-item"));
        hideLoading();

        return;
    }

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
        wrapList.insertAdjacentHTML("beforeend", loadListContent(item, false));
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
