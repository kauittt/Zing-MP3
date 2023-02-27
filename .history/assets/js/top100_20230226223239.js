const endpoint = `https://apizingmp3.vercel.app/api/`;
const top100 = document.querySelector(".top100");
const listSong = document.querySelector(".listSong");
const listSong_content = document.querySelector(".listSong-content");
const listSong_infor = document.querySelector(".listSong-infor");
const content = document.querySelector(".content");

loadSection("top100");

async function loadSection(param) {
    const response = await fetch(`${endpoint}${param}`);
    const { data } = await response.json();
    [...data].forEach((item) => {
        //! section
        const section = document.createElement("div");
        section.className = "section-wrap";
        getListSong(item, section);
    });
}

function getListSong(item, section) {
    const heading = document.createElement("h2");
    heading.className = "section__heading";
    heading.textContent = item.title;
    section.appendChild(heading);

    const list = document.createElement("div");
    list.className = "section-list";

    item.items.forEach((item) => {
        //! listItem
        list.insertAdjacentHTML("beforeend", loadItem(item));
    });
    section.appendChild(list);
    top100.append(section);
}

function loadItem(item) {
    let singers = "";
    item.artists.forEach((item) => {
        singers += item.name + ", ";
    });
    singers = singers.slice(0, -2);
    const template = `
        <a href="#!">
            <div class="section-list-item" data-id="${item.encodeId}">
                <div class="section-list-item-img" ">
                    <img
                        src="${item.thumbnail}"
                        alt=""
                    />
                    <div
                        class="section-list-item-img__layer"
                    >
                        <i
                            class="fa-regular fa-circle-play"
                        ></i>
                    </div>
                </div>
                <h3 class="section-list-item__heading ">
                    ${item.title}
                </h3>
                <p class="section-list-item__desc">
                    ${singers}}
                </p>
            </div>
        </a>
`;
    return template;
}

top100.addEventListener("click", handleItemClick);

async function handleItemClick(e) {
    const id = e.target.closest(".section-list-item").dataset.id;
    const response = await fetch(`${endpoint}detailplaylist?id=${id}`);
    const { data } = await response.json();

    console.log(data);

    content.style.display = "none";
    listSong.style.display = "flex";
}

function loadListInfor(data) {
    const date = new Date(data.contentLastUpdate);
    const time =
        date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

    const singers = "";
    data.artists.forEach((item) => {
        singers += item.name + ", ";
    });
    singers = singers.slice(0, -2);

    const template = `<div class="listSong-infor-img">
    <img
        src="${data.thumbnail}"
        alt=""
    />
</div>
<h2 class="listSong-infor__heading">
${data.title}
</h2>
<p class="listSong-infor__date">Cập nhật: <span>${time}span></p>
<p class="listSong-infor__singers">
    ${singers}
</p>
<p class="listSong-infor__liked"><span>data.like</span> người yêu thích</p>

<div class="listSong-infor__btn">
    <i class="fa-solid fa-pause"></i>
    TẠM DỪNG
</div>`;
    return templatel;
}
