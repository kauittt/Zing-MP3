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

    const fl = data.follow + "";
    let len = fl.length;
    for (let i = 1; i <= len; i++) {
        if (i % 3 == 0) {
            console.log(i);
            fl = fl.slice(0, i - 1) + "." + fl.slice(i - 1, 0);
        }
    }
    console.log(fl);
}
