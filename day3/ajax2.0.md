XMLHttpRequest Level 2中新增了以下功能:

1. 可以设置HTTP请求的时限

```
//最长等待时间设为3000毫秒。过了这个时限，就自动停止HTTP请求
xhr.timeout = 3000
```

与之配套的还有一个timeout事件，用来指定回调函数
```
xhr.ontimeout = function(event){
　　alert('请求超时！');
}
```

2. 可以使用FormData对象管理表单数据

ajax操作往往用来传递表单数据。为了方便表单处理，HTML 5新增了一个FormData对象，可以模拟表单

```
var formData = new FormData();
formData.append('username', 'dcbryant');
formData.append('id', 123456);
xhr.send(formData);
```

FormData对象也可以用来获取网页表单的值
```
　  var form = document.getElementById('myform');
　　var formData = new FormData(form);
　　formData.append('secret', '123456'); 
　　xhr.open('POST', form.action);
　　xhr.send(formData);
```

3. 可以上传文件

```
var formData = new FormData();
for (var i = 0; i < files.length;i++) {
　　formData.append('files[]', files[i]);
}
xhr.send(formData)
```

4. 可以请求不同域名下的数据(CORS)
服务器端设置`Access-Control-Allow-Origin`,其他依旧

5. 可以获取服务器端的二进制数据

接收服务器传回的是二进制对象
```
var xhr = new XMLHttpRequest();
xhr.open('GET', '/path/to/image.png');
xhr.responseType = 'blob';
```

接收数据的时候，用浏览器自带的Blob对象即可。

```javascript　　
var blob = new Blob([xhr.response], {type: 'image/png'});
```

还可以将responseType设为arraybuffer，把二进制数据装在一个数组里

```javascript
var xhr = new XMLHttpRequest();
xhr.open('GET', '/path/to/image.png');
xhr.responseType = "arraybuffer";
```

接收数据的时候，需要遍历这个数组

```javascript
var arrayBuffer = xhr.response;
if (arrayBuffer) {
　　var byteArray = new Uint8Array(arrayBuffer);
　　for (var i = 0; i < byteArray.byteLength; i++) {
　　　　// do something
　　}
}
```

6. 可以获得数据传输的进度信息

新版本的XMLHttpRequest对象，传送数据的时候，有一个progress事件，用来返回进度信息。

它分成上传和下载两种情况。下载的progress事件属于XMLHttpRequest对象，上传的progress事件属于XMLHttpRequest.upload对象

```
xhr.onprogress = updateProgress;
xhr.upload.onprogress = updateProgress

function updateProgress(event) {
　　if (event.lengthComputable) {
       //event.total是需要传输的总字节，event.loaded是已经传输的字节
　　　　var percentComplete = event.loaded / event.total;
　　}
}
```

与progress事件相关的，还有其他五个事件，可以分别指定回调函数


- load事件：传输成功完成。
- abort事件：传输被用户取消。
- error事件：传输中出现错误。
- loadstart事件：传输开始。
- loadEnd事件：传输结束，但是不知道成功还是失败


参考链接：[XMLHttpRequest Level 2 使用指南](http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html)
