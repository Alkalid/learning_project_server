
function getPost() {
    var searchKey = unescape(getCookie("search")); //getCookie("search").toString();
    //alert("sendformclient: " + searchKey);

    let data = new FormData();
    data.append("key", searchKey );

    
    $.ajax({
        url: '/getSearchPost',
        datatype: "json",
        type: 'POST',
        cache: false,
        data: data,
        processData: false,
        contentType: false,

        success: function (retur) 
        {

            var body = document.getElementById("div_searchPosts");
            body.innerHTML = "";
            //var ItemArr = JSON.parse(retur); //把回傳的東西 做成json array
            var PostArr = JSON.parse(retur); //把回傳的東西 做成json array

            for (var i = 0; i < PostArr.length; i++) 
            {
                var images = PostArr[i]['photo']; //得到array第i個物件的欄位: image
                var postid = PostArr[i]['post_id'];
                
                //var comment = 'Likes:' +  PostArr[i]['comment'];
                var content = PostArr[i]['content'];
                var address = PostArr[i]['address'];
                var title = '#' + PostArr[i]['title'];

                var divMain = document.createElement('div'); //最外層 第一
                divMain.setAttribute("class", "container-fluid col-10 col-md-10 col-lg-10 col-xl-10");
                divMain.setAttribute("style", "margin-top: 80px;");

                var divTable = document.createElement('div'); //第二
                divTable.setAttribute("class", "table");
                divTable.setAttribute("style", "margin-left: auto; margin-right: auto;");

                var divFpost = document.createElement('div'); //第3
                divFpost.setAttribute("class", "fpost");

                var imgPost = document.createElement('img'); //第4 img
                imgPost.setAttribute("class", "row col-12 col-lg-12 col-xl-12 align-items-center");
                imgPost.setAttribute("style", "margin: auto;margin-bottom: 20px;width: 620px;height:340");
                imgPost.setAttribute("src", `${images}`);

                var imgtag = document.createElement('img'); //第4 tag img
                imgtag.setAttribute("src", "https://upload.cc/i1/2020/06/09/sHWv4f.png");
                imgtag.setAttribute("style", "width: 50px;margin-left: 14px;margin-right: 7px;margin-top: 4px;float:left");

                var spntitle = document.createElement('span'); //第4 hashtag
                spntitle.setAttribute("style", "margin-left: 14px;margin-right: 14px;float:left;");
                spntitle.textContent = title;

                var commentData = postid+';'+images;
                var a = document.createElement('a'); //第4 tag img
                //a.setAttribute("onclick", 'opencomment('  `${commentData}` )'  ');  
                a.setAttribute("onclick", 'opencomment("' + commentData + '")');

                var imgcom = document.createElement('img'); //第5 留言 img
                imgcom.setAttribute("src", "https://upload.cc/i1/2020/06/09/CoZRHm.png");
                imgcom.setAttribute("style", "width: 30px;height: 30px;margin-right: 14px;float:right;");

                

                var divcontent = document.createElement('div'); //第4
                divcontent.setAttribute("style", "margin-top: 10px;margin-left: 14px;margin-bottom: 0px");
                
                divcontent.innerHTML  += address+"<br>";
                
                divcontent.innerHTML  += content;

                a.appendChild(imgcom);  //地5
                var mybr = document.createElement('br');
                
                divFpost.appendChild(imgPost); //地4
                divFpost.appendChild(imgtag);
                divFpost.appendChild(spntitle);
                divFpost.appendChild(a);
                divFpost.appendChild(mybr);
                divFpost.appendChild(mybr);
                divFpost.appendChild(mybr);
                divFpost.appendChild(mybr);
                divFpost.appendChild(mybr);
                divFpost.appendChild(divcontent);


                
                divTable.appendChild(divFpost);
                divMain.appendChild(divTable);
                body.appendChild(divMain);
            }


        }


    })


    //alert("skey"+searchKey);

}

function getShop() {
    var searchKey = unescape(getCookie("search")); //getCookie("search").toString();
    //alert("sendformclient: " + searchKey);

    let data = new FormData();
    data.append("key", searchKey );

    
    $.ajax({
        url: '/getSearchShop',
        datatype: "json",
        type: 'POST',
        cache: false,
        data: data,
        processData: false,
        contentType: false,

        success: function (retur) 
        {

            var body = document.getElementById("div_searchShops");
            body.innerHTML = "";
            //var ItemArr = JSON.parse(retur); //把回傳的東西 做成json array
            var PostArr = JSON.parse(retur); //把回傳的東西 做成json array
            //alert("retur: " + retur);
            for (var i = 0; i < PostArr.length; i++) 
            {
                var images = PostArr[i]['photo']; //得到array第i個物件的欄位: image
                var place_id = PostArr[i]['place_id'];
                
                
                
                var address = PostArr[i]['address'];
                var phone = PostArr[i]['phone_number'];
                var title = PostArr[i]['name'];


                /////////////////////////////////////////////////////////////////////////////////////////
                var divMain = document.createElement('div'); //最外層 第一
                divMain.setAttribute("class", "container-fluid col-10 col-md-10 col-lg-10 col-xl-10");
                divMain.setAttribute("style", "margin-top: 80px;");

                var divTable = document.createElement('div'); //第二
                divTable.setAttribute("class", "table");
                divTable.setAttribute("style", "margin-left: auto; margin-right: auto;");

                var divFpost = document.createElement('div'); //第3
                divFpost.setAttribute("class", "fpost");

                var imgPost = document.createElement('img'); //第4 img
                imgPost.setAttribute("class", "row col-12 col-lg-12 col-xl-12 align-items-center");
                imgPost.setAttribute("style", "margin: auto;margin-bottom: 20px;width: 620px;height:340");
                imgPost.setAttribute("src", `${images}`);

                var imgtag = document.createElement('img'); //第4 Hashtag img
                imgtag.setAttribute("src", "https://upload.cc/i1/2020/06/09/sHWv4f.png");
                imgtag.setAttribute("style", "width: 50px;margin-left: 14px;margin-right: 7px;margin-top: 4px;float:left");

                var spntitle = document.createElement('span'); //第4 hashtag
                spntitle.setAttribute("style", "margin-left: 14px;margin-right: 14px;float:left;");
                spntitle.textContent = title;

                //var commentData = place_id+';'+images;
                var commentData = place_id
                var a = document.createElement('a'); //第4 tag img
                //a.setAttribute("onclick", 'opencomment('  `${commentData}` )'  ');  
                a.setAttribute("onclick", 'opencomment("' + commentData + '")');

                var imgcom = document.createElement('img'); //第5 留言 img
                imgcom.setAttribute("src", "https://upload.cc/i1/2020/06/09/CoZRHm.png");
                imgcom.setAttribute("style", "width: 30px;height: 30px;margin-right: 14px;float:right;");

                

                var divaddress = document.createElement('div'); //第4 phone
                divaddress.setAttribute("style", "margin-top: 10px;margin-left: 14px;margin-bottom: 0px");
                divaddress.textContent = address;

                var divphone = document.createElement('div'); //第4 phone
                divphone.setAttribute("style", "margin-top: 10px;margin-left: 14px;margin-bottom: 0px");
                if(phone == "")
                {
                    divphone.textContent = "此商家尚未提供電話";
                    divphone.setAttribute("style","margin-top: 10px;margin-left: 14px;margin-bottom: 0px color: gray;");
                }
                else
                {
                    divphone.textContent = phone;
                }
                

                a.appendChild(imgcom);  //地5
                var mybr = document.createElement('br');
                
                divFpost.appendChild(imgPost); //地4
                divFpost.appendChild(imgtag);
                divFpost.appendChild(spntitle);
                //divFpost.appendChild(a);
                divFpost.appendChild(mybr);
                divFpost.appendChild(mybr);
                divFpost.appendChild(mybr);
                divFpost.appendChild(mybr);
                divFpost.appendChild(mybr);

                divFpost.appendChild(divaddress);
                divFpost.innerHTML+="<br>";
                divFpost.appendChild(divphone);


                
                divTable.appendChild(divFpost);
                divMain.appendChild(divTable);
                body.appendChild(divMain);
            }


        }


    })

    //alert("skey"+searchKey);
}

function getUser() {
    var searchKey = unescape(getCookie("search")); //getCookie("search").toString();
    //alert("sendformclient: " + searchKey);

    let data = new FormData();
    data.append("key", searchKey );

    
    $.ajax({
        url: '/getSearchUser',
        datatype: "json",
        type: 'POST',
        cache: false,
        data: data,
        processData: false,
        contentType: false,

        success: function (retur) 
        {

            var body = document.getElementById("div_searchUsers");
            body.innerHTML = "";

            
            var UserArr = JSON.parse(retur); //把回傳的東西 做成json array
            //alert("retur: " + retur);
            for (var i = 0; i < UserArr.length; i++) 
            {
                
                var uid = UserArr[i]['uid'];
                var account = UserArr[i]['account'];
                var name = UserArr[i]['name'];


                /////////////////////////////////////////////////////////////////////////////////////////
                var divMain = document.createElement('div'); //最外層 第一
                divMain.setAttribute("class", "container-fluid col-10 col-md-10 col-lg-10 col-xl-10");
                divMain.setAttribute("style", "margin-top: 80px;");

                var divTable = document.createElement('div'); //第二
                divTable.setAttribute("class", "table");
                divTable.setAttribute("style", "margin-left: auto; margin-right: auto;");

                var divFpost = document.createElement('div'); //第3
                divFpost.setAttribute("class", "fpost");

                var p_account = document.createElement('p'); //第4 account
                p_account.textContent = account;

                var p_name = document.createElement('p'); //第4 account
                p_name.textContent = name;

                var button = document.createElement('button'); //第4 account


                /*var imgtag = document.createElement('img'); //第4 Hashtag img
                imgtag.setAttribute("src", "https://upload.cc/i1/2020/06/09/sHWv4f.png");
                imgtag.setAttribute("style", "width: 50px;margin-left: 14px;margin-right: 7px;margin-top: 4px;float:left");

                var spntitle = document.createElement('span'); //第4 hashtag
                spntitle.setAttribute("style", "margin-left: 14px;margin-right: 14px;float:left;");
                spntitle.textContent = title;

                //var commentData = place_id+';'+images;
                var commentData = place_id
                var a = document.createElement('a'); //第4 tag img
                //a.setAttribute("onclick", 'opencomment('  `${commentData}` )'  ');  
                a.setAttribute("onclick", 'opencomment("' + commentData + '")');

                var imgcom = document.createElement('img'); //第5 留言 img
                imgcom.setAttribute("src", "https://upload.cc/i1/2020/06/09/CoZRHm.png");
                imgcom.setAttribute("style", "width: 30px;height: 30px;margin-right: 14px;float:right;");

                

                var divaddress = document.createElement('div'); //第4 地址
                divaddress.setAttribute("style", "margin-top: 10px;margin-left: 14px;margin-bottom: 0px");
                divaddress.textContent = address;*/

                
                var mybr = document.createElement('br');
                
                divFpost.appendChild(p_account); //地4
                divFpost.appendChild(p_name); //地4
                divFpost.appendChild(mybr);
                divFpost.appendChild(mybr);
                divFpost.appendChild(mybr);
                divFpost.appendChild(mybr);
                divFpost.appendChild(mybr);

                


                
                divTable.appendChild(divFpost);
                divMain.appendChild(divTable);
                body.appendChild(divMain);
            }


        }


    })

    //alert("skey"+searchKey);
}




function printpost() {
    document.getElementById("post").style.display = "";
    document.getElementById("shop").style.display = "none";
    document.getElementById("user").style.display = "none";
    var searchKey = unescape(getCookie("search"));
    var label = document.getElementById("p_showkeyword");
    label.textContent = "有關"+ searchKey +"的貼文";
    getPost();
}
function printshop() {
    document.getElementById("post").style.display = "none";
    document.getElementById("shop").style.display = "";
    document.getElementById("user").style.display = "none";
    var searchKey = unescape(getCookie("search"));
    var label = document.getElementById("p_showkeyword");
    label.textContent = "有關"+ searchKey +"的商家";
    getShop();
}
function printuser() {
    document.getElementById("post").style.display = "none";
    document.getElementById("shop").style.display = "none";
    document.getElementById("user").style.display = "";
    getUser()
}



function getCookie(cookie_name) {
    var results = document.cookie.match ('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
    return results ? decodeURIComponent(results[2]) : null;
}





