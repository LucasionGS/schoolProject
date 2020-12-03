addEventListener("load", () => document.getElementById("formData").addEventListener("submit", validate));

function validate(e: Event) {
  const name = (document.getElementById("inputName") as HTMLInputElement).value;
  const post = (document.getElementById("inputPost") as HTMLInputElement).value;
  const mail = (document.getElementById("inputMail") as HTMLInputElement).value;
  
  // Get references and clear any previous errors
  const nameError = document.getElementById("inputNameError");
  nameError.innerText = "";
  const postError = document.getElementById("inputPostError");
  postError.innerText = "";
  const mailError = document.getElementById("inputMailError");
  mailError.innerText = "";

  let error = false;

  function setErrorName(err: string) {
    nameError.innerText = err;
    error = true;
  };

  function setErrorPost(err: string) {
    postError.innerText = err;
    error = true;
  };

  function setErrorMail(err: string) {
    mailError.innerText = err;
    error = true;
  };

  // Check name
  if (name == "") setErrorName("Name is required.");
  else if (!/^[a-zA-Z ]+$/.test(name)) setErrorName("Name can only include letters and spaces.");
  
  // Check postal code
  if (post == "") setErrorPost("Postal Code is required.");
  else if (!/^[0-9]+$/.test(post)) setErrorPost("Postal code can only include numbers.");
  
  // Check email
  if (mail == "") setErrorMail("E-Mail is required.");
  // Emails can have long TLDs... so I raised the TLD limit
  else if (!/^[A-Za-zÆØÅæøå0-9_.]+[@]{1}[a-zA-z_]+?\.[a-zA-Z]{2,8}$/.test(mail)) setErrorMail("E-Mail is not valid.");

  if (error) e.preventDefault();
  return error;
}