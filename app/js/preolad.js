const runPreloader = () => {
  function loadData() {
    console.log("loadData");
    setTimeout(() => {
      console.log("setTimeout");
      let preloaderEl = document.querySelector(".loader-wrapper");

      preloaderEl.classList.add("loader-hide");
    }, 2000);
  }
  loadData();
};
export default runPreloader();
