async function loadMV(id) {
    const res = await fetch(`https://apizingmp3.vercel.app/api/video?id=${id}`);
    const { data } = await res.json();
    console.log(data);

    const avt = document.querySelector(".mv-heading-img img");
    const song = document.querySelector(".mv-heading-infor__song");
    const singers = document.querySelector(".mv-heading-infor__singers");
    const video = document.querySelector(".mv-content-video");
    const mvRecommend = document.querySelector(".mv-content-recommend-list");

    avt.setAttribute("src", data.artist.thumbnail);
    video.setAttribute("src", data.streaming.mp4["720p"]);
    song.textContent = data.title;
    loadSingers(data.artists, singers);

    [...data.recommends].forEach((item) => {
        mvRecommend.appendChild(
            loadListContent(item, false, false, "listSong")
        );
    });
}
