const drag = document.querySelector(".play-main-time__drag");

//! Sections
const sections = document.querySelectorAll(".section");
let sectionsId = 0;

async function loadSections() {
    const response = await fetch(`https://zing-mp3-api.vercel.app/api/home`);
    const { data } = await response.json();
    // console.log(data);

    for (let i = 2; i <= 14; i++) {
        switch (i) {
            case 2:
            case 3:
            case 4:
            case 5:
            case 7:
            case 11:
            case 13:
            case 14:
                const item = data.items[i];

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
                                src="${itemChild.thumbnail}"
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
                        console.log(itemChild);
                        // loadSingers(, list.lastChild);
                    }
                }

                sections[sectionsId].appendChild(list);
                sectionsId++;
                break;

            default:
                break;
        }
    }
}

loadSections();

//! listSong
const listSong = document.querySelector(".listSong");
const listSong_content = document.querySelector(".listSong-content");
const listSong_infor = document.querySelector(".listSong-infor");
const content = document.querySelector(".content");

content.addEventListener("click", handleItemClick);

async function handleItemClick(e) {
    const id = e.target.closest(".section-list-item").dataset.id;
    const response = await fetch(`${endpoint}detailplaylist?id=${id}`);
    const { data } = await response.json();

    console.log(data);

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
        src="${data.thumbnail}"
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
                src="${data.thumbnail}"
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

drag.addEventListener("input", function (e) {
    const value = e.target.value;
    const progress = `linear-gradient(90deg, #d14781 ${value}%, #e0b2b1 ${value}%)`;
    drag.style.background = progress;
});
