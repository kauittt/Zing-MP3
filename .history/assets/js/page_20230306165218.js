function findIdPage(page) {
    return [...pages].findIndex((item) => {
        return item.dataset.page == page;
    });
}
function showLoading() {
    pages[findIdPage(999)].style.display = "flex";
}
function hideLoading() {
    pages[findIdPage(999)].style.display = "none";
}

//! main
function displayPage(page) {
    pageShowing.style.display = "none";
    const arr = [0, 2];
    pages[findIdPage(page)].style.display = `${
        arr.includes(page) ? "block" : "flex"
    }`;
    pageShowing = pages[findIdPage(page)];
}

const pages = document.querySelectorAll("div[data-page]");
let pageShowing = pages[findIdPage(0)];

//! logo
const logo = document.querySelector(".nav-logo");
logo.addEventListener("click", function (e) {
    displayPage(0);
});

console.log(pages);
