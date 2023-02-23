const slider = document.querySelector(".play-main-time__drag");

slider.addEventListener("input", function () {
    const value =
        ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    const progress = `linear-gradient(90deg, #ff4e50 ${value}%, #ddd ${value}%)`;
    slider.style.background = progress;

    const thumb = document.querySelector("#slider::-webkit-slider-thumb");
    thumb.style.left = `${value}%`;
});
