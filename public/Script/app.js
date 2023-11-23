// Immidiate invoked function express

const { event } = require("jquery");

(function () {
  function Start() {
    console.log("Application started....");
    window.addEventListener("load", Start);
    let deleteButtons = document.querySelectorAll(".btn-danger");
    for (button of deleteButtons) {
      button.addEventListener("click", (event) => {
        if (!confirm("Are you sure")) {
          event.preventDefault();
          window.location.aasign("/Workoutlist");
        }
      });
    }
  }
})();
