const zingChart = document.querySelector(".zingChart");
const ratingVN = document.querySelector(".ratingVN");

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
                rank.textContent = i;
                break;
            case 1:
                rank.classList.add("nd");
                rank.textContent = i;

                break;
            case 2:
                rank.classList.add("rd");
                rank.textContent = i;

                break;
            default:
                rank.textContent = i;

                break;
        }
    }
}
