const zingChart = document.querySelector(".zingChart");
const ratingVN = document.querySelector(".ratingVN");

async function loadZingChart() {
    const res = await fetch("https://apizingmp3.vercel.app/api/charthome");
    const { data } = await res.json();
    console.log(data.RTChart.items);
    for (let i = 0; i < [...data.RTChart.items].length; i++) {
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
