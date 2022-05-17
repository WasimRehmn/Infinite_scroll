let curPage = 1;
let isLoading = false;

const container = document.getElementById("container");

const getData = async () => {
    let res = await fetch(
        `https://picsum.photos/v2/list?page=${curPage}&limit=25`
    );

    let data = await res.json();

    isLoading = await false;
    await showLoader();

    data.map((ele, index) => {
        const htmlData = `
            <div class="images">
                <h3>${index + 1 + 25 * (curPage - 1)}</h3>
                <img src=${ele.download_url} alt=${ele.author} />
            </div>
            `;
        container.insertAdjacentHTML("beforeend", htmlData);
    });
};

getData();

const showData = () => {
    setTimeout(() => {
        curPage++;
        getData();
    }, 2000);
};

const showLoader = () => {
    if (isLoading) {
        document.getElementById("loader").style.opacity = 1;
    } else {
        document.getElementById("loader").style.opacity = 0;
    }
};

window.addEventListener("scroll", async () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (clientHeight + scrollTop >= scrollHeight) {
        isLoading = await true;
        await showLoader();

        await showData();
    }
});
