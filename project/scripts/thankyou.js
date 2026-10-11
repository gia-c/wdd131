// Thank you page: greets the person by name when the form sent it.

const thankYouMessage = document.querySelector("#thankyou-message");
const addressParameters = new URLSearchParams(window.location.search);
const visitorName = addressParameters.get("name");

if (visitorName === null || visitorName.trim() === "") {
    thankYouMessage.textContent = "Thank you for sending your comments. I have received your message and will read it soon.";
} else {
    thankYouMessage.textContent = `Thank you, ${visitorName.trim()}! I have received your message and will read it soon.`;
}
