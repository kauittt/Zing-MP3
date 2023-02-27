const drag = document.querySelector(".play-main-time__drag");

const sections = document.querySelectorAll(".section");

/**
 *! 1 -> 2 3 4
 *! 2 -> 0
 *! 3 -> 1
 *! 4 -> 0
 *! 5 -> 0


 */

async function loadSections() {
    for (let i = 1; i <= 5; i++) {
        const response = await fetch(
            `https://apizingmp3.vercel.app/api/home?page=${i}`
        );
        const { data } = await response.json();
        console.log(data);
        console.log("done");
        switch (i) {
            case (1, 3):
                break;

            default:
                console.log(data.items[0]);
                break;
        }
    }
}

loadSections();
// const listSong = document.querySelector(".listSong");
// const listSong_content = document.querySelector(".listSong-content");
// const listSong_infor = document.querySelector(".listSong-infor");
// const content = document.querySelector(".content");

// top100.addEventListener("click", handleItemClick);

// async function handleItemClick(e) {
//     const id = e.target.closest(".section-list-item").dataset.id;
//     const response = await fetch(`${endpoint}detailplaylist?id=${id}`);
//     const { data } = await response.json();

//     console.log(data);

//     content.style.display = "none";
//     listSong.style.display = "flex";

//     listSong_infor.insertAdjacentHTML("beforeend", loadListInfor(data));
//     loadSingers(
//         data.artists,
//         document.querySelector(".listSong-infor__singers")
//     );

//     data.song.items.forEach((item) => {
//         listSong_content
//             .querySelector(".listSong-content-list")
//             .appendChild(loadListContent(item));
//     });
// }

// function loadSingers(data, selector) {
//     data.forEach((item) => {
//         const template = `<span data-name="${item.alias}">${item.name}, </span>`;
//         selector.insertAdjacentHTML("beforeend", template);
//     });
//     selector.lastChild.textContent = selector.lastChild.textContent.slice(
//         0,
//         -2
//     );
// }

// function loadListInfor(data) {
//     let singers = "";

//     singers = singers.slice(0, -2);

//     const template = `<div class="listSong-infor-img">
//     <img
//         src="${data.thumbnail}"
//         alt=""
//     />
//     <div class="layer">
//                                     <i class="fa-regular fa-circle-play"></i>
//                                 </div>
// </div>
// <h2 class="listSong-infor__heading">
// ${data.title}
// </h2>
// <p class="listSong-infor__date">Cập nhật: 26/02/2023</p>
// <p class="listSong-infor__singers">
// </p>
// <p class="listSong-infor__liked"><span>${data.like}</span> người yêu thích</p>

// <div class="listSong-infor__btn">
//     <i class="fa-solid fa-pause"></i>
//     TẠM DỪNG
// </div>`;
//     return template;
// }

// function loadListContent(data) {
//     let minute = Math.floor(data.duration / 60);
//     let second = "0" + (data.duration % 60);
//     second = second.slice(-2);

//     let item = document.createElement("div");
//     item.className = "listSong-content-list-item";

//     const template = `
//     <div class="listSong-content-list-item-infor">
//         <i class="fa-solid fa-music"></i>
//         <div
//             class="listSong-content-list-item-infor-img"
//         >
//             <img
//                 src="${data.thumbnail}"
//                 alt=""
//             />
//             <div class="layer">
//                                     <i class="fa-regular fa-circle-play"></i>
//                                 </div>
//         </div>

//         <div
//             class="listSong-content-list-item-infor-song"
//         >
//             <p
//                 class="listSong-content-list-item-infor-song__name"
//             >
//                 ${data.title}
//             </p>
//             <p
//                 class="listSong-content-list-item-infor-song__singer"
//             >
//             </p>
//         </div>
//     </div>

//     <p class="listSong-content-list-item__album" data-id="${
//         data.album && data.album.encodeId
//     }">
//         ${data.title}
//     </p>
//     <p class="listSong-content-list-item__time">
//         ${minute}:${second}
//     </p>
// `;
//     item.insertAdjacentHTML("beforeend", template);

//     data.album &&
//         loadSingers(
//             data.album.artists,
//             item.querySelector(".listSong-content-list-item-infor-song__singer")
//         );
//     return item;
// }

drag.addEventListener("input", function (e) {
    const value = e.target.value;
    const progress = `linear-gradient(90deg, #d14781 ${value}%, #e0b2b1 ${value}%)`;
    drag.style.background = progress;
});

// const endpoint = `https://apizingmp3.vercel.app/api/`;
// async function getListSong(param) {
//     const response = await fetch(`${endpoint}${param}`);
//     const { data } = await response.json();
//     const list = data[0].items;

//     console.log(list);

//     for (let i = 0; i < topItems.length; i++) {
//         loadItem(topItems[i], list[i]);
//     }
// }

// function loadItem(item, data) {
//     const img = item.querySelector("img");
//     const heading = item.querySelector(".section-list-item__heading");
//     const desc = item.querySelector(".section-list-item__desc");

//     img.src = data.thumbnail;
//     heading.textContent = data.title;

//     desc.textContent = "";
//     data.artists.forEach((item) => {
//         desc.textContent += `${item.name}, `;
//     });
//     desc.textContent = desc.textContent.slice(0, -2);
// }

// getListSong("top100");
