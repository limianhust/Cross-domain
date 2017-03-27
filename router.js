/**Skip to content
This repository
Search
Pull requests
Issues
Gist
 @limianhust
 Sign out
 Watch 0
  Star 0
 Fork 0 limianhust/mock-server
 Code  Issues 0  Pull requests 0  Projects 0  Wiki  Pulse  Graphs  Settings
Branch: master Find file Copy pathmock-server/router.js
5ada4fb  12 minutes ago
@limianhust limianhust Add comment for CORS
1 contributor
RawBlameHistory     
54 lines (45 sloc)  1.97 KB
*/
/**
 * Created by limian on 2017/3/22.
 */
var http = require('http')
var fs = require('fs')
var url = require('url')
//console.log(Object.keys(http))
var port = process.env.PORT || 8080;

var server = http.createServer(function(request, response){

    var temp = url.parse(request.url, true)
    var path = temp.pathname
    var query = temp.query    //取得get参数，form表单格式

    //从这里开始看，上面不要看

    if(path === '/loadMore'){
        console.log(query)
        response.setHeader('Access-Control-Allow-Origin', '*')  // 设置响应头 Access-Control-Allow-Origin,跨域，任何来源都可以请求得到数据
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type')  // 设置响应头
        response.end(getContent(query.start,query.num))
    }else if(path === '/'){  // 如果用户请求的是 / 路径
        var string = fs.readFileSync('./index.html')  // 就读取 index.html 的内容
        response.setHeader('Content-Type', 'text/html;charset=utf-8')  // 设置响应头 Content-Type
        response.end(string)   // 设置响应消息体
    }else if(path === '/style.css'){   // 如果用户请求的是 /style.css 路径
        var string = fs.readFileSync('./style.css')
        response.setHeader('Content-Type', 'text/css')
        response.end(string)
    }else if(path === '/limian'){
        var datascript = query.callback+'('+27+')'
    		  if (query.name === 'limian'){
        	 if (query.param === 'age'){
            	response.end(datascript) 
        	 }
    		  }
    }else{  // 如果上面都不是用户请求的路径，头部设置text/html格式将路径的文件读取为字符串返回给用户
        var string = fs.readFileSync('.'+path)  // 就读取 index.html 的内容
        response.setHeader('Content-Type', 'text/html;charset=utf-8')  // 设置响应头 Content-Type
        response.end(string)
    }

})

//新闻内容生成
function getContent(start,num) {
    start = Number(start)
    num = Number(num)
    var data = ''
    for(var i =start;i<start+num;i++){
        data =data + '<li>'+'内容'+(i+1)+'</li>'
    }
    console.log(data)
    return data
}


server.listen(port)
console.log('监听 '+ port+ ' 成功')
Contact GitHub API Training Shop Blog About
© 2017 GitHub, Inc. Terms Privacy Security Status Help
