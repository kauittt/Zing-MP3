const singer = document.querySelector(".singer");
const singerContent = document.querySelector(".singer-content");

async function loadSinger(alias) {
    const res = await fetch(
        `https://apizingmp3.vercel.app/api/artist?name=${alias}`
    );
    const { data } = await res.json();

    loadInfor(data);

    console.log(data);
    for (let i = 0; i < [...data.sections].length; i++) {
        const section = data.sections[i];

        if (section.sectionId == "aReArtist") continue;

        const sectionDiv = document.createElement("div");
        sectionDiv.classList.add("section");

        getListSong(section, sectionDiv, singerContent, true);
    }
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
        }

        check++;
    }

    follow.textContent = ans;
}

singerContent.addEventListener("click", function (e) {
    handleItemClick(e.target);
});
