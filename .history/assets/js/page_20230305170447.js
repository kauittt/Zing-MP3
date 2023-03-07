function findIdPage(arr, page) {
    return [...arr].findIndex((item) => {
        return item.dataset.page == page;
    });
}
function hideAndShow(page) {
    pageShowing.classList.remove("show");
    pages[findIdPage(pages, page)].classList.add("show");
}
function showLoading() {
    pages[findIdPage(pages, 999)].style.display = "flex";
}
function hideLoading() {
    pages[findIdPage(pages, 999)].style.display = "none";
}

const pages = document.querySelectorAll("div[data-page]");
let pageShowing = pages[findIdPage(pages, 0)];

module.exports = {
    hideAndShow: hideAndShow,
    showLoading: showLoading,
    hideLoading: hideLoading,
    pageShowing: pageShowing,
};
