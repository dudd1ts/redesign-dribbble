const openSidebarBtn = document.querySelector('.j-open-sidebar');
const closeSidebarBtn = document.querySelector('.j-close-sidebar');
const toggleSidebarCheckbox = document.querySelector('#sidebar-toggle');
const ENTER_KEY = 'Enter';


const toggleSidebar = () => {
  if (event.key === ENTER_KEY) {
    toggleSidebarCheckbox.checked = !toggleSidebarCheckbox.checked;
  }
};

const onSidebarBtnFocus = () => {
  window.addEventListener('keydown', toggleSidebar);
};

const onSidebarBtnBlur = () => {
  window.removeEventListener('keydown', toggleSidebar);
};

openSidebarBtn.addEventListener('focus', onSidebarBtnFocus);
openSidebarBtn.addEventListener('blur', onSidebarBtnBlur);
closeSidebarBtn.addEventListener('focus', onSidebarBtnFocus);
closeSidebarBtn.addEventListener('blur', onSidebarBtnBlur);

toggleSidebarCheckbox.addEventListener('change', (event) => {
  if (event.target.checked) {
    document.body.classList.add('sidebar-opened');
  } else {
    document.body.classList.add('sidebar-opened');
  }
});




