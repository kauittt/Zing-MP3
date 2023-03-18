async function loadNewRelease() {
    const res = await fetch("https://zing-mp3-api.vercel.app/api/category");
    const { data } = await res.json();
    console.log(data);
}
