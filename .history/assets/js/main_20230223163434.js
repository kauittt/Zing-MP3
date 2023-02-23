const drag = document.querySelector(".play-main-time__drag");

drag.addEventListener("input", function (e) {
    console.log(e.target.value);
    const value = ((drag.value - drag.min) / (drag.max - drag.min)) * 100;
    const progress = `linear-gradient(90deg, #ff4e50 ${value}%, #ddd ${value}%)`;
    drag.style.background = progress;

    const thumb = document.querySelector("#slider::-webkit-slider-thumb");
    thumb.style.left = `${value}%`;
});
