export const headerActive = ($target) => {
  document.querySelectorAll('header button').forEach(($Button) => {
    $Button.classList.remove('active');
  });
  $target.classList.add('active');
};

export const printAlert = (message) => {
  alert(message);
};
