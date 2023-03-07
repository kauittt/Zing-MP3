function findIdPage(page) {
    return [...pages].findIndex((item) => {
        return item.dataset.page == page;
    });
}

//! main
function displayPage(page) {
    pageShowing.classList.remove("show");
    pages[findIdPage(page)].classList.add("show");
    pageShowing = pages[findIdPage(page)];
}
function showLoading() {
    pages[findIdPage(999)].style.display = "flex";
}
function hideLoading() {
    pages[findIdPage(999)].style.display = "none";
}

const pages = document.querySelectorAll("div[data-page]");
let pageShowing = pages[findIdPage(0)];
console.log(pages);
