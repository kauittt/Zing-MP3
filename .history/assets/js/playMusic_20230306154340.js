async function handlePlayMusic(imgItem) {
    const id = imgItem.dataset.id;
    const title = imgItem.parentNode.querySelector("h3");
    const desc = imgItem.parentNode.querySelector("p");

    //*? load info
    const img = document.querySelector(".play-infor-img img");
    const heading = document.querySelector(".play-infor-song__name");
    const singers = document.querySelector(".play-infor-song__singer");

    img.setAttribute("src", imgItem.querySelector("img").getAttribute("src"));
    img.setAttribute("data-id", imgItem.getAttribute("data-id"));

    heading.textContent = title.textContent;
    heading.setAttribute("data-id", imgItem.getAttribute("data-id"));

    singers.innerHTML = "";
    singers.innerHTML = desc.innerHTML;

    const response = await fetch(
        `https://zing-mp3-api.vercel.app/api/song/${id}`
    );
    const { data } = await response.json();

    if (!data) {
        showVip();
        return;
    }

    //? prepare
    mp3.src = data["128"];

    mp3.addEventListener("loadedmetadata", function (e) {
        mp3.play();
        displayPlay();
    });
}

function loadSingers(artists, selector) {
    if (!artists) return;

    artists.forEach((artist) => {
        const template = `<span data-name="${artist.alias}">${artist.name}, </span>`;
        selector.insertAdjacentHTML("beforeend", template);
    });

    //? remove ", "
    selector.lastChild.textContent = selector.lastChild.textContent.slice(
        0,
        -2
    );
}
