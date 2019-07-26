import scrapy


class Dota2(scrapy.Spider):
    name = "dota2"
    url = "http://db.dota2.uuu9.com/hero/show/lc"

    def start_requests(self):
        yield scrapy.Request(self.url, self.parse)

    def parse(self, response):
        result = response.xpath(
            "/html/body/div[2]/div[1]/div[3]/div/div[2]/div/div/div[6]/div[2]/ul/li/div[2]/p/text()").extract()
            "/html/body/div[2]/div[1]/div[3]/div/div[2]/div/div/div[6]/div[2]/ul/li/div[2]/p/span/text()").extract()
        result2 = response.xpath(
            "/html/body/div[2]/div[1]/div[3]/div/div[2]/div/div/div[6]/div[2]/ul/li/div[2]/dl/text()").extract()
        result3 = response.xpath(
            "/html/body/div[2]/div[1]/div[3]/div/div[2]/div/div/div[6]/div[2]/ul/li/div[2]/dl/span/text()").extract()
        result4 = response.xpath(
        a = len(result)
        print(len(result))
        print(len(result2))
        print(len(result3))
        print(len(result4))
        for i in range(0, a):
            d = result[i]
            e = result2[i]
            f = result3[i]
            g = result4[i]
            print(d.strip())
