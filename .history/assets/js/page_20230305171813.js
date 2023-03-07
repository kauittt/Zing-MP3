function findIdPage(page) {
    return [...pages].findIndex((item) => {
        return item.dataset.page == page;
    });
}
function hideAndShow(page) {
    pageShowing.classList.remove("show");
    pages[findIdPage(pages, page)].classList.add("show");
    pageShowing = pages[findIdPage(pages, page)];
}
function showLoading() {
    pages[findIdPage(pages, 999)].style.display = "flex";
}
function hideLoading() {
    pages[findIdPage(pages, 999)].style.display = "none";
}

const pages = document.querySelectorAll("div[data-page]");
let pageShowing = pages[findIdPage(pages, 0)];
