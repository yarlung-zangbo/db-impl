# Personal Service

* 返回结果结构统一为：
```json
//成功：
{
    "status": "ok",
    "values": "Object"
}

//失败：
{
    "status": "fail",
    "values": "Object"
}
```

* `/getSelfBooks`
```json
req: GET
url: http://hostname:port/yuesheng/getSelfBooks 
par: username
res: {
    "status": "ok",
    "values": [
        {
            "bookid": 2,
            "name": "rub",
            "creater": {
                "username": "zxz",
                "name": "xiaxiao"
            }
        },
        ...
    ]
}
```


* `/getFavorite`
```json
req: GET
url: http://hostname:port/yuesheng/getFavorite
par: username
res: {
    "status": "ok",
    "values": [
        {
            "bookid": 1,
            "name": "xiaxiao1",
            "creater": {
                "username": "zxz",
                "name": "xiaxiao"
            }
        },
        ...
    ]
}
    
```


* `/getListenRecord`
```json
req: GET
url: http://hostname:port/yuesheng/getListenRecord 
par: username
res: {
    "status": "ok",
    "values": [
        {
            "listenId": 12,
            "time": "2019-07-17 15:53:46",
            "soundbook": {
                "bookid": 12,
                "name": "昨日青空",
                "creater": {
                    "username": "zxz",
                    "name": "xiaxiao"
                }
            }
        },
        ...
    ]
}
```

* `/modifyName`
```json
req: POST
url: http://hostname:port/yuesheng/modifyName
par: username, bookid, name
res: {"status": "ok", "values": "name"}
     {"status": "fail", "values": "have no this book"}
     {"status": "fail", "values": "this book isnot yours"}
```

* `/deleteBook`
```json
req: POST
url: http://hostname:port/yuesheng/deleteBook
par: username, bookid
res: {"status": "ok", "values": "bookid"}
     {"status":"fail", "values": "have no this book"}
     {"status":"fail", "values": "this book isnot yours"}
```

* `/findSelfBook`
```json
req: GET
url: http://hostname:port/yuesheng/findSelfBook
par: username, name
res: {
    "status": "ok",
    "values": [
        {
            "bookid": 2,
            "name": "rub",
            "creater": {
                "username": "zxz",
                "name": "xiaxiao"
            }
        },
        ...
    ]
}
```

* `/findFavorite`
```json
req: GET
url: http://hostname:port/yuesheng/findFavorite
par: username, name
res: {
    "status": "ok",
    "values": [
        {
            "bookid": 5,
            "name": "tt6",
            "creater": {
                "username": "yz",
                "name": "yuanZhuo"
            }
        },
        ...
    ]
}
```


* `/favorite`
```json
req: Post
url: http://hostname:port/yuesheng/favorite
par: username, bookid
res: {"status": "ok","values": 0}
     {"status": "ok","values": "bookid"}
```


* `/unFavorite`
```json
req: POST
url: http://hostname:port/yuesheng/unFavorite
par: username, bookid
res: res: 
     {"status": "ok","values": 0}
     {"status": "ok","values": "bookid"}
     {"status": "fail", "values": "book not release"}
     {"status": "fail", "values": "book disabled"}
```