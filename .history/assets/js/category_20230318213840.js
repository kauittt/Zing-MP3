const banner = document.querySelector(".category-banner img");
const categoryContent = document.querySelector(".category-content");

async function loadNewRelease() {
    const res = await fetch("https://zing-mp3-api.vercel.app/api/category");
    const { data } = await res.json();
    console.log(data);

    banner.setAttribute("src", data.banners[0].cover);
}
