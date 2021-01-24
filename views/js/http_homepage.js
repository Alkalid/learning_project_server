var body = document.getElementsByTagName('body')[0];

//var body = document.getElementById('canvas');

$.ajax({
    url: 'http://114.35.11.36:3500/getHomeItem',
    datatype: "json",
    success: function (retur) 
    {
        
    }
})

jQuery.support.cors = true;
$.ajax({
    url: 'http://114.35.11.36:3500/getHomeItem',
    datatype: "json",
    success: function (retur) 
    {
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
            divcontent.textContent = content;

            a.appendChild(imgcom);  //第4裝地5
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


