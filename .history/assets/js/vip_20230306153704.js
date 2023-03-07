const error = document.querySelector(".error");

function showVip() {
    error.classList.add("show");
}

function hideVip() {
    error.classList.remove("show");
}
error.addEventListener("click", function (e) {
    if (e.target.matches(".error")) {
        console.log("errr");
        hideVip();
    }
});

error.querySelector("i").addEventListener("click", function (e) {
    hideVip();
});
