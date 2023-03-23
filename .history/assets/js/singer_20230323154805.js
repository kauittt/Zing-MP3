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
        sectionDiv.className = `section ${section.sectionId}`;

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

singerContent.addEventListener("click", async function (e) {
    const heading = e.target.closest(".section-list-item-img");
    const img = e.target.closest(".section-list-item__heading");
    if (!heading && !img) {
        return;
    }

    console.log("work");
    const section = e.target.closest(".section");

    if (
        !section.classList.contains("aMV") &&
        !section.classList.contains("aSongs")
    ) {
        handleItemClick(e.target);
        return;
    }

    if (section.classList.contains("aSongs")) {
        showLoading();
        // const id = e.target.closest(".section-list-item").dataset.id;

        // const response = await fetch(`${endpoint}infosong?id=${id}`);
        // const { data } = await response.json();

        await handlePlayMusic(e.target.closest(".section-list-item-img"));
        hideLoading();
    }
});
