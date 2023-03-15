const navLinks = document.querySelectorAll(".nav h2[data-nav]");
let navSelected = 1;

for (let i = 0; i < [...navLinks].length; i++) {
    const item = navLinks[i];
    item.addEventListener("click", async function (e) {
        navLinks[navSelected].classList.remove("nav-category__item--selected");
        item.classList.add("nav-category__item--selected");
        navSelected = item.dataset.nav;

        switch (navSelected) {
            case "1":
                displayPage(0);
                break;

            case "3":
                displayPage(3);
                pageShowing = pages[findIdPage(3)];
                if (!zingChart.querySelector(".ratingVN-list-item")) {
                    showLoading();
                    await loadZingChart();
                    hideLoading();
                }
                break;
            case "7":
                displayPage(2);
                pageShowing = pages[findIdPage(2)];

                if (!topContent.querySelector(".section-list-item")) {
                    showLoading();
                    await loadTop("top100");
                    hideLoading();
                }
                break;
            default:
        }
    });
}
