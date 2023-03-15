const zingChart = document.querySelector(".zingChart");
const ratingVN = document.querySelector(".ratingVN");
const ratingVNList = document.querySelector(".ratingVN-list");
const weeklyRate = document.querySelector(".weeklyRate");
const weeklyRateList = document.querySelectorAll(
    ".weeklyRate-wrap-section-list"
);

async function loadZingChart() {
    const res = await fetch("https://apizingmp3.vercel.app/api/charthome");
    const { data } = await res.json();

    for (let i = 0; i < [...data.RTChart.items].length; i++) {
        const item = data.RTChart.items[i];

        const divItem = loadListContent(
            item,
            true,
            true,
            "zingChart",
            "ratingVN-list"
        );
        const rank = divItem.querySelector(".ratingVN-list-item-infor__rank");

        switch (i) {
            case 0:
                rank.classList.add("st");
                rank.textContent = i + 1;
                break;
            case 1:
                rank.classList.add("nd");
                rank.textContent = i + 1;

                break;
            case 2:
                rank.classList.add("rd");
                rank.textContent = i + 1;

                break;
            default:
                rank.textContent = i + 1;
                break;
        }
        ratingVNList.appendChild(divItem);
    }
}

function loadWeeklyRate(data) {
    weeklyRateList[0].setAttribute("data-id", data.weekChart.vn.playlistId);
    loadWeeklyRateList(weeklyRateList[0], data.weekChart.vn.items);

    weeklyRateList[1].setAttribute("data-id", data.weekChart.us.playlistId);
    loadWeeklyRateList(weeklyRateList[1], data.weekChart.us.items);

    weeklyRateList[2].setAttribute("data-id", data.weekChart.korea.playlistId);
    loadWeeklyRateList(weeklyRateList[2], data.weekChart.korea.items);
}

function loadWeeklyRateList(selector, items) {
    for (let i = 0; i < [...items].length; i++) {
        const item = items[i];

        const divItem = loadListContent(
            item,
            false,
            true,
            "zingChart",
            "weeklyRate-wrap-section-list"
        );
        const rank = divItem.querySelector(
            ".weeklyRate-wrap-section-list-item-infor__rank"
        );

        switch (i) {
            case 0:
                rank.classList.add("st");
                rank.textContent = i + 1;
                break;
            case 1:
                rank.classList.add("nd");
                rank.textContent = i + 1;

                break;
            case 2:
                rank.classList.add("rd");
                rank.textContent = i + 1;

                break;
            default:
                rank.textContent = i + 1;
                break;
        }
        selector.appendChild(divItem);
    }
}
