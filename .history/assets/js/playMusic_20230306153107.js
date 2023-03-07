async function handlePlayMusic(item) {
    const id = item.dataset.id;
    const title = item.parentNode.querySelector("h3");
    const desc = item.parentNode.querySelector("p");

    const img = document.querySelector(".play-infor-img img");
    const heading = document.querySelector(".play-infor-song__name");
    const singers = document.querySelector(".play-infor-song__singer");

    img.setAttribute("src", item.querySelector("img").getAttribute("src"));
    img.setAttribute("data-id", item.getAttribute("data-id"));

    heading.textContent = title.textContent;
    heading.setAttribute("data-id", item.getAttribute("data-id"));

    singers.innerHTML = "";
    singers.innerHTML = desc.innerHTML;

    const response = await fetch(
        `https://zing-mp3-api.vercel.app/api/song/${id}`
    );
    const { data } = await response.json();

    if (!data) {
        error.classList.add("show");
        return;
    }
    //? prepare
    mp3.src = data["128"];

    mp3.addEventListener("loadedmetadata", function (e) {
        mp3.play();
        displayPlay();
    });
}
