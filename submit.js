document.getElementById('submitButton').addEventListener('click', function () {
  const form = document.getElementById('contactForm');
  if (form.checkValidity()) {
    form.submit();
  } else {
    form.reportValidity();
  }
});
