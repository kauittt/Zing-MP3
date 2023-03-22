const endpoint = `https://apizingmp3.vercel.app/api/`;
const content = document.querySelector(".content");
content.addEventListener("click", async function (e) {
    if (e.target.matches(".section__more.top100")) {
        navLinks[7].click();
    }
});
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
        const sectionDiv = document.createElement("div");
        const list = document.createElement("div");
        let len = 0;
        section.items ? (len = Math.min(section.items.length, 5)) : "";

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
            case "new-release":
                sectionDiv.className = `section ${section.sectionId}`;

                //more
                if (section.sectionId == "h100") {
                    console.log("work");
                    sectionDiv.insertAdjacentHTML(
                        "beforeend",
                        `
                    <p class="section__more top100">Tất cả></p>
                    `
                    );
                }

                sectionDiv.insertAdjacentHTML(
                    "beforeend",
                    `<h2 class="section__heading">${
                        i == data.items.length - 1 ? "Album" : section.title
                    }</h2>`
                );

                list.className = `section-list`;

                sectionDiv.appendChild(list);
                content.appendChild(sectionDiv);
                break;

            case "playlist":
                sectionDiv.className = `section ${section.sectionId}`;

                sectionDiv.insertAdjacentHTML(
                    "beforeend",
                    `<h2 class="section__heading">${
                        i == data.items.length - 1 ? "Album" : section.title
                    }</h2>`
                );

                list.className = `section-list`;

                for (let a = 0; a < len; a++) {
                    list.insertAdjacentHTML(
                        "beforeend",
                        loadSectionListItem(
                            section.items[a],
                            section.items[a].artists
                        )
                    );
                }

                sectionDiv.appendChild(list);
                content.appendChild(sectionDiv);
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

async function test() {
    const res = await fetch(
        "https://zingmp3.vn/api/v2/video/get/list?id=IWZ9Z08I"
    );
    const { data } = await res.json();
}

// test();
