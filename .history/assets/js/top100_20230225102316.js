const endpoint = `https://apizingmp3.vercel.app/api/top100`;
const section = document.querySelector(".top100");

async function loadSection() {
    const response = await fetch(endpoint);
    const { data } = await response.json();
    [...data].forEach((item) => {
        getListSong(item, item.title);
    });
}

function getListSong(item, title) {
    item.items.forEach((item) => {
        loadItem(item, title);
    });
}

function loadItem(item, title) {
    let singers = "";
    item.artists.forEach((item) => {
        singers += item.name + ", ";
    });
    singers = singers.slice(0, -2);
    console.log(singers);
    console.log(item);
    const template = `<div class="section-wrap">
    <h2 class="section__heading">${title}</h2>
    <div class="section-list">
        <a href="#!">
            <div class="section-list-item">
                <div class="section-list-item-img">
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
                <h3 class="section-list-item__heading">
                    ${item.title}
                </h3>
                <p class="section-list-item__desc">
                    Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Facere.
                </p>
            </div>
        </a>
    </div>
</div>`;
}

loadSection();
