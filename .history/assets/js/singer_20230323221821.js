const singer = document.querySelector(".singer");
const singerContent = document.querySelector(".singer-content");

async function loadArtist(alias) {
    const res = await fetch(
        `https://apizingmp3.vercel.app/api/artist?name=${alias}`
    );
    const { data } = await res.json();
    singerContent.innerHTML = "";

    loadInfor(data);

    console.log(data);
    for (let i = 0; i < [...data.sections].length; i++) {
        const section = data.sections[i];

        //! chổ này làm thêm
        if (section.sectionId == "aReArtist") continue;
        if (!section.items) continue;

        const sectionDiv = document.createElement("div");
        sectionDiv.className = `section ${section.sectionId}`;

        getListSong(section, sectionDiv, singerContent, true);
    }
}

function loadInfor(data) {
    const avt = document.querySelector(".singer-heading-img img");
    const name = document.querySelector(".singer-heading-infor__name");
    const follow = document.querySelector(".singer-heading-infor__follow span");
    const heading = document.querySelector(".singer-heading");

    const moreHeading = document.querySelector(".singer-more__heading");
    const moreAvt = document.querySelector(".singer-more-content-img img");
    const moreDesc = document.querySelector(".singer-more-content-about__desc");
    const moreFollow = document.querySelector(
        ".singer-more-content-about_follow span"
    );

    if (
        data.cover !=
        "https://zmp3-static.zmdcdn.me/skins/zmp3-v5.2/images/default_cover.png"
    ) {
        heading.style.backgroundImage = `url(${data.cover})`;
        heading.style.height = "400px";
        name.style.color = "white";
        follow.style.color = "rgba(254,255,255,.8)";
    } else {
        heading.style.backgroundImage = `var(--alpha-bg)`;
        heading.style.height = "230px";
        name.style.color = "var(--primary-text)";
        follow.style.color = "var(--secondary-text)";
    }
    avt.setAttribute("src", data.thumbnailM);
    moreAvt.setAttribute("src", data.thumbnailM);
    name.textContent = data.name;
    moreHeading.textContent = `Về ${data.name}`;

    const biography = data.biography.split("<br>");
    console.log(biography);
    [...biography].forEach((item) => {
        const p = document.createElement("p");
        p.textContent = item;
        moreDesc.appendChild(p);
    });

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
    follow.textContent = `${ans} người theo dõi`;
    moreFollow.textContent = ans;
}

singerContent.addEventListener("click", async function (e) {
    const heading = e.target.closest(".section-list-item-img");
    const img = e.target.closest(".section-list-item__heading");
    if (!heading && !img) {
        return;
    }

    const section = e.target.closest(".section");

    if (
        !section.classList.contains("aMV") &&
        !section.classList.contains("aSongs")
    ) {
        handleItemClick(e.target);
        return;
    }

    if (section.classList.contains("aSongs")) {
        await handlePlayMusic(e.target.closest(".section-list-item-img"));
    }

    if (section.classList.contains("aMV")) {
        await handlePlayMusic(e.target.closest(".section-list-item-img"));
    }
});
singerContent.addEventListener("click", function (e) {
    if (e.target.matches(".section__more")) {
        console.log("work");
    }
});
