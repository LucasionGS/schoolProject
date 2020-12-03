addEventListener("load", function () { return document.getElementById("formData").addEventListener("submit", validate); });
function validate(e) {
    var name = document.getElementById("inputName").value;
    var post = document.getElementById("inputPost").value;
    var mail = document.getElementById("inputMail").value;
    // Get references and clear any previous errors
    var nameError = document.getElementById("inputNameError");
    nameError.innerText = "";
    var postError = document.getElementById("inputPostError");
    postError.innerText = "";
    var mailError = document.getElementById("inputMailError");
    mailError.innerText = "";
    var error = false;
    function setErrorName(err) {
        nameError.innerText = err;
        error = true;
    }
    ;
    function setErrorPost(err) {
        postError.innerText = err;
        error = true;
    }
    ;
    function setErrorMail(err) {
        mailError.innerText = err;
        error = true;
    }
    ;
    // Check name
    if (name == "")
        setErrorName("Name is required.");
    else if (!/^[a-zA-Z ]+$/.test(name))
        setErrorName("Name can only include letters and spaces.");
    // Check postal code
    if (post == "")
        setErrorPost("Postal Code is required.");
    else if (!/^[0-9]+$/.test(post))
        setErrorPost("Postal code can only include numbers.");
    // Check email
    if (mail == "")
        setErrorMail("E-Mail is required.");
    // Emails can have long TLDs... so I raised the TLD limit
    else if (!/^[A-Za-zÆØÅæøå0-9_.]+[@]{1}[a-zA-z_]+?\.[a-zA-Z]{2,8}$/.test(mail))
        setErrorMail("E-Mail is not valid.");
    if (error)
        e.preventDefault();
    return error;
}
