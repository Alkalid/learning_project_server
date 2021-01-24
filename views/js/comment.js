var apost_id = "";

$("button").click(function () {
    $("body").prepend("<div class='hit'></div>");
});

window.onload=function() {
    var zhezhao=document.getElementById("zhezhao");
    var login=document.getElementById("login");
    var bt=document.getElementById("bt");
    var btclose=document.getElementById("btclose");
    
    /*bt.onclick=function() {
        zhezhao.style.display="block";
        login.style.display="block";
    }*/
    btclose.onclick=function() {
        zhezhao.style.display="none";
        login.style.display="none"; 
    }
}

function opencomment(data) {
    var post_data = data.split(";");
    //alert("uid"+ data);
    var zhezhao=document.getElementById("zhezhao");
    var login=document.getElementById("login");
    var bt=document.getElementById("bt");
    var btclose=document.getElementById("btclose");
    var img_comment=document.getElementById("img_comment");

    img_comment.setAttribute("src", post_data[1] );
    getPostComment(post_data[0]); //用post_id 來找留言

    zhezhao.style.display="block";
    login.style.display="block";
}

function btclose() {
    
    var zhezhao=document.getElementById("zhezhao");
    var login=document.getElementById("login");
    var bt=document.getElementById("bt");
    var btclose=document.getElementById("btclose");

    zhezhao.style.display="none";
    login.style.display="none";
}



function newPostComment() {
    var textarea_comments = document.getElementById("textarea_comments").value;
    var textarea = document.getElementById("textarea_comments");
    textarea.value = "";
    var a = document.getElementById("textarea_comments");
    a.textContent = '';
    //alert(textarea_comments);
    //alert("確認送出留言?");
    if(textarea_comments != "")
    {
        
        let data = new FormData();
        uid = getCookie("uid");
       
        data.append("content",textarea_comments);
        data.append("uid", uid );
        data.append("post_id", apost_id );

        $.ajax({
            url: 'http://114.35.11.36:3500/newPostComment',
            type: 'POST',
            cache: false,
            data: data,
            processData: false,
            contentType: false,
            success: function (e) 
            {
                //alert(e);
                reData = e;

                if(reData == 'fail')
                {
                    alert('');
                }
                else if(reData=='success')//正確 跳轉
                {
                    //解析json
                    alert('新增留言成功');
                    getPostComment(apost_id);
                }
            }
        }).done(function(res) {
        }).fail(function(res) {});
    }
}


function getPostComment(post_id) {
    apost_id = post_id;
    jQuery.support.cors = true;
    $.ajax({
        url: 'http://114.35.11.36:3500/getPostComment',
        datatype: "json",
        data: ';' + post_id + ';',
        success: function (retur) 
        {
            //alert(retur);
            var div_comments = document.getElementById("div_comments");
            div_comments.textContent = "";

            //var ItemArr = JSON.parse(retur); //把回傳的東西 做成json array
            var CommentArr = JSON.parse(retur); //把回傳的東西 做成json array
            //alert(CommentArr.length);
            for (var i = 0; i < CommentArr.length; i++) 
            {
                var content = CommentArr[i]['content'];
                var name = CommentArr[i]['name'];
                var date = CommentArr[i]['date'];

                var p = document.createElement('p');
                p.textContent = name + ":";
                p.setAttribute("style", "font-weight:bold;font-size: 18px;");

                var p2 = document.createElement('p');
                p2.textContent = content;
                p2.setAttribute("style", "font-weight:normal;font-size: 16px;");

                var p3 = document.createElement('p');
                p3.textContent = date;
                p3.setAttribute("style", "font-weight:normal;font-size: 12px;");

                var br = document.createElement('br');
                var divcom = document.createElement('div'); //最內層
                divcom.setAttribute("style", "color:white;font-family:微軟正黑體;font-size: small;margin-left: 10px;");
                
                divcom.appendChild(p);
                divcom.appendChild(p2);
                divcom.appendChild(p3);
                //divcom.textContent += content;
                
                

                var divbottom = document.createElement('div'); //最內層
                divbottom.setAttribute("style", "border-bottom: white solid 1px;");

                var divnu = document.createElement('div'); //最-1層 
                divnu.appendChild(divcom);
                divnu.appendChild(divbottom);

                div_comments.appendChild(divnu);
            }


        }


    })
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
