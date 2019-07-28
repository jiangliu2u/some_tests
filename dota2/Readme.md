# DOTA2英雄资料
* Max+ App上查看英雄资料没有快捷搜索功能,很麻烦,故用scrapy爬虫从www.dotamax.com爬取最新的DOTA2英雄资料,并存储到redis数据库,为后续自己查找方便,后续会写个简单的客户端自己用
* 爬取时用了style的样式来选择元素,网站更新后可能会失效
* 仅供学习之用

## 运行
用pip安装redis,scrapy,lxml,然后在pipelines.py里redis的地址端口和密码,然后运行python run.py即可