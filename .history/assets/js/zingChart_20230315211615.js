const zingChart = document.querySelector(".zingChart");

async function loadZingChart() {
    const res = await fetch("https://apizingmp3.vercel.app/api/charthome");
    const { data } = await res.json();
}
