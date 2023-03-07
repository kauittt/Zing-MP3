const endpoint = `https://apizingmp3.vercel.app/api/`;

loadAll();

async function loadAll() {
    showLoading();
    await loadSections();
    hideLoading();
}

//! Section
let sectionsId = 0;
async function loadSections() {
    const response = await fetch(`https://zing-mp3-api.vercel.app/api/home`);
    const { data } = await response.json();
    for (let i = 0; i <= 15; i++) {
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
            case 6:
            case 8:
            case 12:
            case 15:
                const item = data.items[i];
                sections[sectionsId] &&
                    sections[sectionsId].insertAdjacentHTML(
                        "beforeend",
                        `<h2 class="section__heading">${
                            i == 15 ? "Album" : item.title
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
                    list.insertAdjacentHTML(
                        "beforeend",
                        loadSectionListItem(item.items[a])
                    );
                }

                sections[sectionsId] && sections[sectionsId].appendChild(list);
                sectionsId++;
                break;
        }
    }
}

const sections = document.querySelectorAll(".section");
[...sections].forEach((item) => {
    item.addEventListener("click", handleItemClick);
});

//! Slider
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

    console.log(data);
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

    loadSectionListItem("");

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
