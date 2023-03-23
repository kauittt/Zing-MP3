async function loadSinger(alias) {
    const singer = document.querySelector(".singer");
    const content = document.querySelector(".singer-content");

    const res = await fetch(
        `https://apizingmp3.vercel.app/api/artist?name=${alias}`
    );
    const { data } = await res.json();

    console.log(data);
    loadInfor(data);
}

function loadInfor(data) {
    const avt = document.querySelector(".singer-heading-img img");
    const name = document.querySelector(".singer-heading-infor__name");
    const follow = document.querySelector(".singer-heading-infor__follow span");

    avt.setAttribute("src", data.thumbnailM);
    name.textContent = data.name;

    let fl = data.follow + "";
    let len = fl.length;

    let check = 0;
    for (let i = 0; i < len; i++) {
        console.log(i);
        fl = fl.slice(0, i - 1) + "." + fl.slice(i, 0);
    }
    console.log(fl);
}
