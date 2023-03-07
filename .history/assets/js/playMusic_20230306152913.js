async function handleItemClick(e, id = null) {
    const key = id;
    if (!id) {
        const heading = e.target.closest(".section-list-item-img");
        const img = e.target.closest(".section-list-item__heading");
        if (!heading && !img) {
            return;
        }
        id =
            e.target.closest(".section-list-item") &&
            e.target.closest(".section-list-item").dataset.id;
    }
    pages[3].style.display = "flex";

    if (
        !key &&
        e.target.closest(".section-list").classList.contains("section-song")
    ) {
        handlePlayMusic(e.target.closest(".section-list-item"));
        pages[3].style.display = "none";

        return;
    }

    const response = await fetch(
        `https://zing-mp3-api.vercel.app/api/playlist/${id}`
    );
    const { data } = await response.json();

    [...pages].forEach((item) => {
        item.style.display = "none";
    });
    pages[1].style.display = "flex";

    listSong_infor.innerHTML = "";
    listSong_content.innerHTML = "";

    listSong_infor.insertAdjacentHTML("beforeend", loadListInfor(data));

    loadSingers(
        data.artists,
        document.querySelector(".listSong-infor__singers")
    );

    listSong_content.insertAdjacentHTML(
        "beforeend",
        `<p class="listSong-content__desc">${data.sortDescription}
</p>
<div class="listSong-content-list">
                        <div class="listSong-content-list-heading">
                            <p class="listSong-content-list-heading__title">
                                <i class="fa-solid fa-list"></i>
                                BÀI HÁT
                            </p>
                            <p class="listSong-content-list-heading__title">
                                ALBUM
                            </p>
                            <p class="listSong-content-list-heading__title">
                                THỜI GIAN
                            </p>
                        </div>
                    </div>`
    );
    data.song.items.forEach((item) => {
        listSong_content
            .querySelector(".listSong-content-list")
            .appendChild(loadListContent(item));
    });

    wrapList.innerHTML = "";
    data.song.items.forEach((item) => {
        wrapList.insertAdjacentHTML("beforeend", loadListContent(item, false));
    });
    pages[3].style.display = "none";
}
