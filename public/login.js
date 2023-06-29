async function callSomeFunction() {
    const response = await fetch('/api/some-function');
    const data = await response.json();
    console.log(data.result);
  }

  async function signUp() {
    let name = document.getElementById('regname').value.trim();
    let pass = document.getElementById('regpassword').value.trim();
    let email = document.getElementById('regemail').value.toLowerCase().trim();
    let phone = document.getElementById('regphoneno').value.trim();
    const inputdetails = {
      name:name,
      password:pass,
      email:email,
      phone:phone
    }
    console.log(inputdetails);
    //alert(inputdetails['name']);
    const response = await fetch(`/api/send-register?value=${JSON.stringify(inputdetails)}`);
    const data = await response.json();
    alert(data.message);
    if(data.message=="Signup successful")
    window.location.href = 'scroll.html'
  }

  async function login() {
    let mail = document.getElementById('logmail').value.trim().toLowerCase();
    let pass = document.getElementById('logpassword').value;
    const loginCred = {
      email:mail,
      password:pass
    }
    const response = await fetch(`/api/send-login?value=${JSON.stringify(loginCred)}`);
    const data = await response.json();
    alert(data.message);
    if(data.message == "Login Successful"){
      window.location.href = 'scroll.html'
    }
  }