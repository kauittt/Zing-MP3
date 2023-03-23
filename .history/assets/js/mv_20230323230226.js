const mvRecommendList = document.querySelector(
async function loadMV(id) {
    const res = await fetch(`https://apizingmp3.vercel.app/api/video?id=${id}`);
    const { data } = await res.json();
    console.log(data);

    const avt = document.querySelector(".mv-heading-img img");
    const song = document.querySelector(".mv-heading-infor__song");
    const singers = document.querySelector(".mv-heading-infor__singers");
    const video = document.querySelector(".mv-content-video");
        ".mv-content-recommend-list"
    );
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

mvRecommendList.addEventListener("click", function(e) {
    
})