const drag = document.querySelector(".play-main-time__drag");
const top100 = document.querySelector(".top100");

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
    [...data[0].items].forEach((item) => {
        console.log(item);
    });
}

getListSong("top100");
