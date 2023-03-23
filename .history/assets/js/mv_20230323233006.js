const mvRecommendList = document.querySelector(".mv-content-recommend-list");
const mv = document.querySelector(".mv");
const mvClose = document.querySelector(".mv-heading-close");
const mvHeading = document.querySelector(".mv-heading");

async function loadMV(id) {
    const res = await fetch(`https://apizingmp3.vercel.app/api/video?id=${id}`);
    const { data } = await res.json();
    console.log(data);

    const avt = document.querySelector(".mv-heading-img img");
    const song = document.querySelector(".mv-heading-infor__song");
    const singers = document.querySelector(".mv-heading-infor__singers");
    const video = document.querySelector(".mv-content-video");

    mvRecommendList.innerHTML = "";

    avt.setAttribute("src", data.artist.thumbnail);
    video.setAttribute("src", data.streaming.mp4["720p"]);
    song.textContent = data.title;
    loadSingers(data.artists, singers);

    [...data.recommends].forEach((item) => {
        const template = loadListContent(
            item,
            false,
            false,
            "listSong",
            "mv-content-recommend-list"
        );
        loadSingers(
            item.artists,
            template.querySelector(".general-item-infor-song__singer")
        );
        mvRecommendList.appendChild(template);
    });
}

mvRecommendList.addEventListener("click", async function (e) {
    if (e.target.closest(".general-item-infor-img")) {
        mvHeading.insertAdjacentHTML(
            "beforeend",
            `<div class="line-loading"></div>`
        );

        await loadMV(e.target.closest(".general-item-infor-img").dataset.id);
    }
});
mvClose.addEventListener("click", function (e) {
    mv.classList.remove("show");
});
