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
    let ans = "";

    let check = 0;
    for (let i = 0; i < len; i++) {
        if (check == 3) {
            console.log(check);
            ans = fl.slice(0, i) + "." + fl.slice(i);
            check = 0;
            //1111111
        }

        check++;
    }
    console.log(ans);
}
