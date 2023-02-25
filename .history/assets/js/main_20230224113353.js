const drag = document.querySelector(".play-main-time__drag");
drag.addEventListener("input", function (e) {
    const value = e.target.value;
    const progress = `linear-gradient(90deg, #d14781 ${value}%, #e0b2b1 ${value}%)`;
    drag.style.background = progress;
});

const endpoint = `https://apizingmp3.vercel.app/api/`;
async function getListSong(param) {
    const response = await fetch(`${endpoint}${param}`);
    const { data } = await response.json();
    console.log(data[0].items);
    for (let i = 0; i < 5; i++) {}
}

getListSong("top100");
