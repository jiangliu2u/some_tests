from scrapy.cmdline import execute
execute(['scrapy', 'crawl', 'dota2',"-s","LOG_FILE=all.log"])