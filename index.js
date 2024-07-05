/**
* CommonJS 模組寫法
*/

/* --- 導入模組 --- */
    const express = require("express");
    // 導入json
    const {singers} = require("./singer.json");
    console.log(singers);

/* --- 應用express --- */
    const app = express();

/* --- 定義路由規則 --- */
app.get("/",(req,res) => {
    // res.send("這是首頁");
    // 重新定向到指定url-redirect
    res.redirect("/singer/3.html");
});

// 路徑參數 :id 
app.get("/singer/:id.html",(req,res) => {
    // 獲取URL中的 id 參數，並將其轉換為整數
    const id = parseInt(req.params.id); 
    // 在 singers 數組中查找匹配的歌手對象
    const result = singers.find( singer => {
        if(singer.id === id){
            return true;
        }
    });
    // 寫法一
    // if(result){

    // }else{

    // }

    // 寫法二
    if(!result){  // 沒有結果
        // statusCode設置http響應狀態碼   
        res.statusCode = 404;
        res.send("<h1>404-找不到歌手</h1>")
        return;
    }
    // 有結果
    res.send(`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${result.singer_name}</title>
                </head>
                <body>
                    <h1>${result.singer_name}</h1>
                    <h3>${result.singer_id}</h3>
                    <img src="${result.singer_img}" alt="">
                </body>
                </html>`);
});

/* --- 捕獲所有其他路徑 --- */
app.all("*",(req,res) => {
    res.send("<h1>404-找不到</h1>")
})

/* --- 啟動伺服器 --- */
app.listen(3000,() => {
    console.log(`服務已啟動於http://localhost:3000`);
})

