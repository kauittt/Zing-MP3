const newRelease = document.querySelector(".newRelease");
const newReleaseList = document.querySelector(".newRelease-list");

async function loadNewRelease() {
    const res = await fetch(
        "https://zing-mp3-api.vercel.app/api/chart/new-release"
    );
    const { data } = await res.json();

    console.log(data);
}
