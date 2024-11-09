(function () {
  const tabParent = document.querySelectorAll('[data-tabs]');
  if (!tabParent.length) return;

  tabParent.forEach((parent) => {
    const buttons = parent.querySelectorAll('[data-tab-link]');
    const tabContent = parent.querySelectorAll('[data-tab-content]');

    //page is load, close all tabs content
    closeTabs(tabContent);

    buttons.forEach((button) => {
      //page is load, open active Tab
      if (button.classList.contains('active-tab-button')) {
        const activeTabContent = parent.querySelector(
          `[data-tab-content='${button.getAttribute('data-tab-link')}']`
        );
        activeTabContent.classList.add('active-tab-content');
      }

      button.addEventListener('click', function () {
        const activeTabContent = parent.querySelector(
          `[data-tab-content='${button.getAttribute('data-tab-link')}']`
        );

        buttons.forEach((item) => {
          item.classList.remove('active-tab-button');
        });

        closeTabs(tabContent);

        //open active Tab
        this.classList.add('active-tab-button');
        activeTabContent.classList.add('active-tab-content');
      });
    });
  });

  function closeTabs(items) {
    items.forEach((item) => {
      item.classList.remove('active-tab-content');
    });
  }
})();
