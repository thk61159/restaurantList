# 我的餐廳清單
利用node.js打造喜愛的餐廳清單，提供餐廳列表，且能進一步查看特色內容、地址及預約電話，也可以使用搜尋功能，即刻找到你最想去的餐廳！

## 功能
1. 查看所有餐廳列表
2. 查看餐廳資料
3. 搜尋功能
4. 新增餐廳
5. 編輯餐廳
6. 刪除餐廳
7. 排序功能

## 使用介面
![alt 使用介面圖示](https://raw.githubusercontent.com/thk61159/AC-restaurantList/master/%E9%A4%90%E5%BB%B3CRUD%20improved.png "我的餐廳清單使用介面")

## 如何使用
1. 開啟終端機(terminal)，輸入如下將專案複製到電腦中
```shell
 git clone https://github.com/thk61159/AC-restaurantList.git
```
2. 至MongoDB建立帳號並安裝MongoDB Atlas及Robo 3T
MONGODB_URI=mongodb+srv://使用者帳號:使用者密碼@資料庫伺服器位置ip/你建立的資料庫名稱?retryWrites=true&w=majority
3. 利用Robo 3T建立欲使用資料庫
4. 進入此專案資料夾，安裝各種套件
```shell
 cd restaurantList
 npm install -g nodemon //只需安裝一次
 npm install express@4.16.4
 npm i express-handlebars@6.0.6
 npm i mongoose@5.9.7
 npm i dotenv -D
 npm install method-override@3.0.0
```
5. 建立.env檔並輸入
MONGODB_URI=mongodb+srv://使用者帳號:使用者密碼@資料庫伺服器位置ip/你建立的資料庫名稱?retryWrites=true&w=majority
6. 新增種子資料(可省略)
```shell
node models/seeds/listSeeder.js
```
3. 運行我的餐廳清單
```shell
 nodemon app.js
```
4. 拜訪我的餐廳清單網頁
```shell
 http://localhost:3000/
```

##開發工具
* Visual Studio Code 
* Node.js v14.16.0
* Express.js v4.16.4
* Express-handlebars v6.0.6
* MongoDB
* mongoose v5.9.7
* method-override v3.0.0

##參考
* [餐廳列表](https://drive.google.com/open?id=1W-BD9-c8zJRYCwAD8yhqQdLwcUdN8GZi)
* [餐廳列表樣板](https://codepen.io/alpha-camp/pen/yrLbrZ)
* [餐廳詳情樣板](https://codepen.io/alpha-camp/pen/JVjNgG)
