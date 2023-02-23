const drag = document.querySelector(".play-main-time__drag");

drag.addEventListener("input", function (e) {
    const value = e.target.value;
    // const value = ((drag.value - drag.min) / (drag.max - drag.min)) * 100;
    // console.log(value);
    const progress = `linear-gradient(90deg, #d14781 ${value}%, ##e0b2b1 ${value}%)`;
    drag.style.background = progress;

    // const thumb = document.querySelector("#slider::-webkit-slider-thumb");
    // thumb.style.left = `${value}%`;
});
