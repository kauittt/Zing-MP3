const drag = document.querySelector(".play-main-time__drag");
drag.addEventListener("input", function (e) {
    const value = e.target.value;
    const progress = `linear-gradient(90deg, #d14781 ${value}%, #e0b2b1 ${value}%)`;
    drag.style.background = progress;
});

const endpoint = `https://apizingmp3.vercel.app/api/`;
async function getListSong(param) {
    const response = await fetch(`${endpoint}${param}`);
    console.log(response);
}

getListSong("top100");
