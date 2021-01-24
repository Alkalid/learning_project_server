var placetype;
var flag = 0;   //階段  註冊: 0 1 2 3     已經是商家11 風景12
var placetype = -1; //註冊種類 1: 商家 2: 風景
var hasImahe = -1;  //使用者已經選圖片了
var uid = "";
function checkUserFlag() {


    uid = getCookie("uid");
    jQuery.support.cors = true;
    $.ajax({
        url: 'http://114.35.11.36:3500/checkUserFlag',
        data: ';' + uid + ';',
        datatype: "json",
        success: function (e) {
            //alert(e);
            reData = e;
            var userdata = reData.toString().split(';');//1:uid 2:name
            var shopname = document.getElementById("newshopname").value;
            var shopaddress = document.getElementById("newshopaddress").value;
            var shopphone = document.getElementById("newshopphone").value;
            var spotname = document.getElementById("newspotname").value;
            var spotaddress = document.getElementById("newspotaddress").value;

            if (reData == '0') {
                flag = 0;
                first();
                //alert('redata 0');
            }
            else {
                var ShopArr = JSON.parse(reData); // 分析回傳的商家json //place_id	name	address	rating	storeflag	phone_number	spotflag	uid
                var placeid = ShopArr[0]['place_id'];
                var storeflag = ShopArr[0]['storeflag'];
                var spotflag = ShopArr[0]['spotflag'];
                var name = ShopArr[0]['name'];
                var address = ShopArr[0]['address'];
                var phone_number = ShopArr[0]['phone_number'];
                var shop_uid = ShopArr[0]['uid'];

                if (spotflag == '0' && storeflag == '1') {
                    document.getElementById("printshopname").textContent = "商店名稱: " + name;
                    document.getElementById("printshopaddress").textContent = "商店地址: " + address;
                    document.getElementById("printshopphone").textContent = "商店電話: " + phone_number;

                    flag = 11;
                    first();
                }
                else if (spotflag == '1' && storeflag == '0') {
                    document.getElementById("printspotname").textContent = "景點姓名: " + name;
                    document.getElementById("printspotaddress").textContent = "景點地址: " + address;

                    flag = 12;
                    first();
                }
                //alert(placeid); 
            }
        }

    })

}

function NewPlace() {   //確認表單都填完後  就新增地點
    document.getElementById("but2").disabled = "disabled";
    var name = "";
    var address = "";
    var phone = "";
    var storeflag = "";
    var spotflag = "";
    if(placetype == 1)
    {
        name = document.getElementById("newshopname").value;
        address = document.getElementById("newshopaddress").value;
        phone = document.getElementById("newshopphone").value;
        storeflag = "1";
        spotflag = "0";
    }
    else if(placetype == 2)
    {
        name = document.getElementById("newspotname").value;
        address = document.getElementById("newspotaddress").value;
        storeflag = "0";
        spotflag = "1";
    }

    let data = new FormData();
    data.append("file", document.getElementById('uploadingfile').files[0]);
    data.append("name", name);
    data.append("address", address);
    data.append("phone_number", phone);
    data.append("uid", uid);
    data.append("storeflag", storeflag);
    data.append("spotflag", spotflag);
    
    $.ajax({
        url: 'http://114.35.11.36:3500/newPlace',
        type: 'POST',
        cache: false,
        data: data,
        processData: false,
        contentType: false,
        success: function (e) {
            //alert("newplace" , e);
            reData = e;

            if (reData == 'fail') {

            }
            else if (reData == 'success')//正確 跳轉
            {
                //解析json
                alert('上傳成功');
                window.location = "/home";

            }
        }
    }).done(function (res) {
    }).fail(function (res) { });
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


function first() {
    if (flag == 0) {
        document.getElementById("forward").style.display = "";

        document.getElementById("div_newshop").style.display = "none";
        document.getElementById("div_newspot").style.display = "none";
        

        document.getElementById("but1").style.display = "none";
        document.getElementById("but2").style.display = "none";
        document.getElementById("printshopname").style.display = "none";
        document.getElementById("printshopaddress").style.display = "none";
        document.getElementById("printshopphone").style.display = "none";
        document.getElementById("printspotname").style.display = "none";
        document.getElementById("printspotaddress").style.display = "none";
        document.getElementById("but3").style.display = "none";
        document.getElementById("but4").style.display = "none";
    } else if (flag == 1) {
        document.getElementById("div_newshop").style.display = "none";
        document.getElementById("div_newspot").style.display = "none";
        document.getElementById("but1").style.display = "none";
        document.getElementById("but2").style.display = "none";
        document.getElementById("form_post").style.display = "";
        document.getElementById("forward").style.display = "none";
        
        document.getElementById("printshopname").style.display = "none";
        document.getElementById("printshopphone").style.display = "none";
        document.getElementById("printshopaddress").style.display = "none";
        document.getElementById("printshopphone").style.display = "none";
        document.getElementById("printspotname").style.display = "none";
        document.getElementById("printspotaddress").style.display = "none";
        document.getElementById("but3").style.display = "none";
        document.getElementById("but4").style.display = "none";


    } else if (flag == 2) {
        document.getElementById("div_newshop").style.display = "";
        document.getElementById("div_newspot").style.display = "none";
        document.getElementById("but1").style.display = "";
        document.getElementById("but2").style.display = "";
        document.getElementById("form_post").style.display = "none";
        document.getElementById("forward").style.display = "none";
        
        
        document.getElementById("printshopname").style.display = "none";
        document.getElementById("printshopphone").style.display = "none";
        document.getElementById("printshopaddress").style.display = "none";
        document.getElementById("printshopphone").style.display = "none";
        document.getElementById("printspotname").style.display = "none";
        document.getElementById("printspotaddress").style.display = "none";
        document.getElementById("but3").style.display = "none";
        document.getElementById("but4").style.display = "none";


    } else if (flag == 3) {
        document.getElementById("div_newspot").style.display = "";
        document.getElementById("div_newshop").style.display = "none";
        document.getElementById("but1").style.display = "";
        document.getElementById("but2").style.display = "";
        document.getElementById("form_post").style.display = "none";
        document.getElementById("forward").style.display = "none";
        
        document.getElementById("printshopname").style.display = "none";
        document.getElementById("printshopphone").style.display = "none";
        document.getElementById("printshopaddress").style.display = "none";
        document.getElementById("printshopphone").style.display = "none";
        document.getElementById("printspotname").style.display = "none";
        document.getElementById("printspotaddress").style.display = "none";
        document.getElementById("but3").style.display = "none";
        document.getElementById("but4").style.display = "none";
    } else if (flag == 11) {

        document.getElementById("printshopname").style.display = "";
        document.getElementById("printshopaddress").style.display = "";
        document.getElementById("printshopphone").style.display = "";
        document.getElementById("but3").style.display = "";
        document.getElementById("but4").style.display = "none";
        //document.getElementById("but4").style.display="";
        document.getElementById("forward").style.display = "none";
        document.getElementById("div_newshop").style.display = "none";
        document.getElementById("div_newspot").style.display = "none";
        document.getElementById("but1").style.display = "none";
        document.getElementById("but2").style.display = "none";
        document.getElementById("printspotname").style.display = "none";
        document.getElementById("printspotaddress").style.display = "none";

    } else if (flag == 12) {
        document.getElementById("printspotname").style.display = "";
        document.getElementById("printspotaddress").style.display = "";
        document.getElementById("but3").style.display = "";
        document.getElementById("but4").style.display = "none";
        //document.getElementById("but4").style.display="";
        document.getElementById("forward").style.display = "none";
        document.getElementById("div_newshop").style.display = "none";
        document.getElementById("div_newspot").style.display = "none";
        document.getElementById("but1").style.display = "none";
        document.getElementById("but2").style.display = "none";
        document.getElementById("printshopname").style.display = "none";
        document.getElementById("printshopaddress").style.display = "none";
        document.getElementById("printshopphone").style.display = "none";
    }

}


function checkplacetype() { //註冊階段 0~1 判斷註冊什麼place
    var obj = document.getElementsByName("place");
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked) {
            placetype = obj[i].value.toString();
        }
    }

    if (placetype == "商家") {
        document.getElementById("p_postTitle").textContent = "為你的商店增加圖片!";
        placetype = 1;
    } else if (placetype == "景點") {
        document.getElementById("p_postTitle").textContent = "為你的景點增加圖片!";
        placetype = 2;
    }
    //alert("placetype " + placetype);
    flag = 1; //進入上傳圖片程序
    first();
}

function checkupload(e) {   //預覽圖片
    var file = e.files[0];
    var post_img = document.getElementById("post_img");
    post_img.setAttribute("src", URL.createObjectURL(e.files[0]));
    if (!file) {
        alert("fail");
        return;
    }
    else {
        hasImahe = 1;
        //alert("success");
        //alert(e.files[0].mozFullPath);
        //alert(URL.createObjectURL(e.files[0]));
    }

    //檔案上傳
    //...
    //檔案上傳

    //上傳後將檔案清除
    //e.value = '';
}

function ImageReady() {  //註冊階段 1~2 or 3 判斷註冊什麼place 且圖片要有東西
    if (hasImahe != 1) {
        alert("請選擇圖片");
    }else if (flag == 1) {
        if (placetype == 1) {
            flag = 2;
            first();
        } else if (placetype == 2) {
            flag = 3;
            first();
        }
    }
}


function registered() { //送出註冊要求
    var shopname = document.getElementById("newshopname").value;
    var shopaddress = document.getElementById("newshopaddress").value;
    var shopphone = document.getElementById("newshopphone").value;
    var spotname = document.getElementById("newspotname").value;
    var spotaddress = document.getElementById("newspotaddress").value;
    //alert(uid + shopname + shopaddress + shopphone + spotname + spotaddress);
    if (flag == 2) {
        if (shopname == "") {
            alert("請填入商店名稱")
        }else if (shopaddress == "") {
            alert("請填入商店地址")
        }else {
            NewPlace();
        }
    } else if  (flag == 3) {
        if (spotname == "") {
            alert("請填入景點名稱");
        }else if (spotaddress == "") {
            alert("請填入景點地址")
        }else {
            NewPlace();
        }
    }
}
function change() {

}
function back() {
    //alert("back");
    window.location = "/user";
}