const mvContent = document.querySelector(".mv-content-recommend");

async function loadMV(id) {
    const res = await fetch(`https://apizingmp3.vercel.app/api/video?id=${id}`);
    const { data } = await res.json();
    console.log(data);

    const avt = document.querySelector(".mv-heading-img img");
    const song = document.querySelector(".mv-heading-infor__song");
    const singers = document.querySelector(".mv-heading-infor__singers");
    const video = document.querySelector(".mv-content-video");
    console.log(data.streaming.mp3["720p"]);

    avt.setAttribute("src", data.artist.thumbnail);
    video.setAttribute("src", data.streaming.mp3["720p"]);
    song.textContent = data.title;
    loadSingers(data.artists, singers);
}
