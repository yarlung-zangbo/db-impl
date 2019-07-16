# Login Service

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

* `/login`
```json
req: POST
url: http://hostname:port/yuesheng/login 
par: username、password
res: {"status": "ok"}
     {"status":"fail", "values": "user not exist"}
     {"status":"fail", "values": "password wrong"}
     {"status":"fail", "values": "user is disabled"}
     {"status":"fail", "values": "user not activated"}
```


* `/userMessage`
```json
req: GET
url: http://hostname:port/yuesheng/userMessage
par: null
res: {
      "status": "ok",
      "values": {
          "username": "name",
          "email":"xxx@xxx.com",
          "gender": 1,
          "name": "nickname",
          "registertime": "time"
        }
    }
    {"status":"fail", "values": "login first"}
    
```


* `/register`
```json
req: POST
url: http://hostname:port/yuesheng/register 
par: username、email、password、confirmPassword
res: {"status": "ok", "values": "check emial to activate account"}
     {"status":"fail", "values": "username cannot be null"}
     {"status":"fail", "values": "password cannot be null"}
     {"status":"fail", "values": "invalid email format"}
     {"status":"fail", "values": "different password"}
     {"status":"fail", "values": "username has been registered"}
```

* `/modifyName`
```json
req: POST
url: http://hostname:port/yuesheng/modifyName
par: name
res: {"status": "ok", "values": "name"}
     {"status":"fail", "values": "login first"}
```

* `/modifyGender`
```json
req: POST
url: http://hostname:port/yuesheng/modifyGender
par: gender
res: {"status": "ok", "values": "gender"}
     {"status":"fail", "values": "login first"}
```

* `/modifyPassword`
```json
req: POST
url: http://hostname:port/yuesheng/modifyPassword
par: oldPassword、newPassword、confirmPassword
res: {"status": "ok", "values": null}
     {"status":"fail", "values": "login first"}
     {"status":"fail", "values": "old password wrong"}
     {"status":"fail", "values": "password cannot be null"}
     {"status":"fail", "values": "different password"}
```

* `/modifyEmail`
```json
req: POST
url: http://hostname:port/yuesheng/modifyEmail
par: email
res: {"status": "ok", "values": "check emial to modify email"}
     {"status":"fail", "values": "login first"}
     {"status":"fail", "values": "invalid email format"}
     {"status":"fail", "values": "send email fail"}
```

* 以及不公开service
  * `/isLogin`
  * `/authentication/require`
  * `/loginError`
  * `/activate`
  * `/confirmModifyEmail`