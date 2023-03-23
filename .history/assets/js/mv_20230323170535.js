const mvContent = document.querySelector(".mv-content-recommend");

async function loadMV(id) {
    const res = await fetch(`https://apizingmp3.vercel.app/api/video?id=${id}`);
    const { data } = await res.json();
    console.log(data);
}
