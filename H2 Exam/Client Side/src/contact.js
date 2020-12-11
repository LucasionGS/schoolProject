"use strict";
addEventListener("load", () => {
    document.getElementById("formData").addEventListener("submit", validate);
    let p = new URLSearchParams(location.search);
    if (p.get("success") == "1") {
        let h1 = document.createElement("h1");
        h1.innerText = "Your message has been sent! We will return to you within 7 years. Thanks for your patience.";
        document.getElementById("content").insertBefore(h1, document.getElementById("contactContainer"));
    }
});
function validate(e) {
    const name = document.getElementById("inputName").value;
    const subject = document.getElementById("inputSubject").value;
    const mail = document.getElementById("inputMail").value;
    const message = document.getElementById("inputMessage").value;
    // Get references and clear any previous errors
    const nameError = document.getElementById("inputNameError");
    nameError.innerText = "";
    const subjectError = document.getElementById("inputSubjectError");
    subjectError.innerText = "";
    const mailError = document.getElementById("inputMailError");
    mailError.innerText = "";
    const messageError = document.getElementById("inputMessageError");
    messageError.innerText = "";
    let error = false;
    function setErrorName(err) {
        nameError.innerText = err;
        error = true;
    }
    ;
    function setErrorSubject(err) {
        subjectError.innerText = err;
        error = true;
    }
    ;
    function setErrorMail(err) {
        mailError.innerText = err;
        error = true;
    }
    ;
    function setErrorMessage(err) {
        messageError.innerText = err;
        error = true;
    }
    ;
    // Check name
    if (name.trim() == "")
        setErrorName("Name is required.");
    else if (!/^[a-zA-Z ]+$/.test(name))
        setErrorName("Name can only include letters and spaces.");
    // Check subject
    if (subject.trim() == "")
        setErrorSubject("Subject is required.");
    // Check email
    if (mail.trim() == "")
        setErrorMail("E-Mail is required.");
    // Emails can have long TLDs... so I raised the TLD limit
    else if (!/^[A-Za-zÆØÅæøå0-9_.]+[@]{1}[a-zA-z_]+?\.[a-zA-Z]{2,8}$/.test(mail))
        setErrorMail("E-Mail is not valid.");
    // Check message
    if (message.trim() == "")
        setErrorMessage("Message is required.");
    if (message.length <= 32)
        setErrorMessage("Message is too short, at least 32 characters required.");
    if (message.length > 1000)
        setErrorMessage("Message is long, maximum 1000 characters.");
    if (error)
        e.preventDefault();
    return error;
}
