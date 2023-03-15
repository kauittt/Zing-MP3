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
        switch (i) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                break;
        }
    }
}
