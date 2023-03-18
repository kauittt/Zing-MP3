async function loadNewRelease() {
    const res = await fetch(
        "https://zing-mp3-api.vercel.app/api/chart/new-release"
    );
    const { data } = await res.json();
}
