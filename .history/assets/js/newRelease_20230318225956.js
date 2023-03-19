const newRelease = document.querySelector(".newRelease");
const newReleaseList = document.querySelector(".newRelease-list");
const newReleaseBanner = document.querySelector(".newRelease-banner img");

async function loadNewRelease() {
    newReleaseBanner.setAttribute(
        "src",
        "https://png.pngtree.com/background/20210710/original/pngtree-music-headset-red-simple-banner-picture-image_1059930.jpg"
    );
    const res = await fetch(
        "https://zing-mp3-api.vercel.app/api/chart/new-release"
    );
    const { data } = await res.json();

    for (let i = 0; i < 100; i++) {
        const item = data.items[i];

        const divItem = loadListContent(
            item,
            true,
            true,
            "zingChart",
            "newRelease-list"
        );
        const rank = divItem.querySelector(".newRelease-list-item-infor__rank");

        switch (i) {
            case 0:
                rank.classList.add("st");
                rank.textContent = i + 1;
                break;
            case 1:
                rank.classList.add("nd");
                rank.textContent = i + 1;

                break;
            case 2:
                rank.classList.add("rd");
                rank.textContent = i + 1;

                break;
            default:
                rank.textContent = i + 1;
                break;
        }
        newReleaseList.appendChild(divItem);
    }
}

// let selected = null;
newRelease.addEventListener("click", async function (e) {
    if (e.target.closest(".general-item-infor-img")) {
        const item = e.target.closest(".general-item");

        selected && selected.classList.remove("selected");
        selected = item;
        selected.classList.add("selected");

        time.value = 0;
        mp3.currentTime = 0;
        mp3.pause();

        if (!btns[2].classList.contains("fa-circle-pause")) {
            btns[2].classList.add("fa-circle-pause");
            btns[2].classList.remove("fa-circle-play");
        }

        play.querySelector(".play-main-time__total").textContent =
            item.querySelector(".general-item__time").textContent;
        play.classList.add("show");

        await handlePlayMusic(e.target.closest(".general-item-infor-img"));
    }
});
