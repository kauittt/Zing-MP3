const newRelease = document.querySelector(".newRelease");
const newReleaseList = document.querySelector(".newRelease-list");

async function loadNewRelease() {
    const res = await fetch(
        "https://zing-mp3-api.vercel.app/api/chart/new-release"
    );
    const { data } = await res.json();

    for (let i = 0; i < 100; i++) {
        const item = data.items[i];

        const divItem = loadListContent(
            item,
            true,
            true,
            "zingChart",
            "newRelease-list"
        );
        const rank = divItem.querySelector(".newRelease-list-item-infor__rank");

        switch (i) {
            case 0:
                rank.classList.add("st");
                rank.textContent = i + 1;
                break;
            case 1:
                rank.classList.add("nd");
                rank.textContent = i + 1;

                break;
            case 2:
                rank.classList.add("rd");
                rank.textContent = i + 1;

                break;
            default:
                rank.textContent = i + 1;
                break;
        }
        newReleaseList.appendChild(divItem);
    }
}
