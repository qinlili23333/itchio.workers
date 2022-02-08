# itchio.workers
用Cloudflare Workers解析itchio的下载链接

## 接口说明
### directlink
返回一个前往解析地址结果的302请求  
### proxylink
代理下载，免费版cf只能下载100M以内文件  
### getlink
以文本格式返回解析地址结果  

## 传入参数
### user
itch.io用户名，是项目拥有者的，可通过域名判断，如`qinlili23333.itch.io`则为`qinlili23333`  
### project
项目名，可通过地址判断，如`xxx.itch.io/zhijiang-mobile`则为`zhijiang-mobile`  
### fileid
文件id，在下载页面右键下载按钮可看到`<a href="javascript:void(0);" class="button download_btn" data-upload_id="5201078">下载</a>`，其中`data-upload_id`对应的`5201078`就是文件id  


## 测试地址
### itchio.qinlili.bid
为防止滥用，本域名仅可解析琴梨梨的项目，需要解析其他项目请自行部署
