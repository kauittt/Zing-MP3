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
    console.log(data);
    for (let i = 0; i < data.items.length; i++) {
        const section = data.items[i];

        switch (section.sectionType) {
            case "banner":
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

            case "recentPlaylist":
                sections[sectionsId].insertAdjacentHTML(
                    "beforeend",
                    `<h2 class="section__heading">${section.title}</h2>`
                );

                const div = document.createElement("div");
                div.className = `section-list`;

                sections[sectionsId].appendChild(div);
                break;

            case "recentPlaylist":
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

                console.log(item);
                console.log(item.items);
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

    const div = document.createElement("div");
    div.insertAdjacentHTML(
        "beforeend",
        loadSectionListItem(data, data.album.artists)
    );

    await handlePlayMusic(div.querySelector(".section-list-item-img"));
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
