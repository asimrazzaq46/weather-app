const input = document.querySelector(".location");
const WeatherForm = document.querySelector("form");
const message_1 = document.querySelector("#message-1");
const message_2 = document.querySelector("#message-2");

WeatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  message_1.textContent = "";
  message_2.textContent = "";
  const location = input.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          message_1.style.color = "red";
          message_2.style.color = "brown";
          message_1.textContent = "ERROR!";
          message_2.textContent = data.error;
        } else {
          message_1.style.color = "green";
          message_2.style.color = "green";

          message_1.textContent = data.location;
          message_2.textContent = data.foreCast;
        }
      });
    }
  );
  input.value = "";
});
