async function loadNewRelease() {
    const res = await fetch(
        "https://zing-mp3-api.vercel.app/api/category/IWZ9Z09U"
    );
    const { data } = await res.json();
    console.log(data);
}
