// tabs
const tabs = document.querySelectorAll(".nav-link");
const tabContents = document.querySelectorAll('[data-tab-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        const targetId = tab.getAttribute('href').substring(1);
        const targetContent  = document.getElementById(targetId);


        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active');
        })

        tab.classList.add("active");
        targetContent.classList.add('active');
    })
})
