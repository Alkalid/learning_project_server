function login() {
var username = document.getElementById("username");
var pass = document.getElementById("password");
if (username.value == "") {
alert("請輸入帳號");
} else if (pass.value  == "") {
alert("請輸入密碼");
} else if(username.value == "admin" && pass.value == "123456"){
window.location.href="welcome.html";
} else {
alert("請輸入正確的使用者名稱和密碼！")
}
}