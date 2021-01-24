function cancle() {
    
       
    }

function define() {
    var user_name = document.getElementById("user_name");
    var account = document.getElementById("account");
    var password = document.getElementById("password");
    var gender = document.getElementById("gender");
    if (user_name.value == "") {
        alert("請輸入使用者名稱");
    } else if (account.value  == "") {
        alert("請輸入帳號");
    } else if (password.value  == "") {
        alert("請輸入密碼");
    } else if (gender.value  == "") {
        alert("請輸入性別");
    } else if(user_name.value == "admin" && password.value == "123456"){
        window.location.href="welcome.html";
    } else {
        alert("請輸入正確的使用者名稱和密碼！")
    }
}