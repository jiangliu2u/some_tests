import scrapy


class Dota2(scrapy.Spider):
    name = "dota2"
    url = "http://db.dota2.uuu9.com/hero/show/SPE"

    def start_requests(self):
        yield scrapy.Request(self.url, self.parse)

    def parse(self, response):
        # 每个等级的技能效果
        result = response.xpath(
            "/html/body/div[2]/div[1]/div[3]/div/div[2]/div/div/div[6]/div[2]/ul/li/div[2]/p/text()").extract()
        # 技能描述
        result4 = response.xpath(
            "/html/body/div[2]/div[1]/div[3]/div/div[2]/div/div/div[6]/div[2]/ul/li/div[2]/p/span[@class='red']/text()").extract()
        result2 = response.xpath(
            "/html/body/div[2]/div[1]/div[3]/div/div[2]/div/div/div[6]/div[2]/ul/li/div[2]/dl/text()").extract()
        # 技能详情
        result3 = response.xpath(
            "/html/body/div[2]/div[1]/div[3]/div/div[2]/div/div/div[6]/div[2]/ul/li/div[2]/p/span[@class='orange']/text()").extract()

        # a = len(result)
        # print(len(result))
        # print(len(result2))
        # print(len(result3))
        # print(len(result4))
        # result
        temp1 = "/html/body/div[2]/div[1]/div[3]/div/div[2]/div/div/div[6]/div[2]/ul/li["
        temp2 = "]/div[2]/p/span[@class='orange']/text()"#技能描述 施法距离 施法时间之类的前缀
        temp4 = "]/div[2]/p/text()"#技能描述 施法距离 施法时间之类的具体值
        temp6 = "]/div[1]/a[2]/text()"#技能名称
        for i in range(0, len(result4)):
            detail = result4[i]
            temp3 = temp1+str(i+1)+temp2
            temp5 = temp1+str(i+1)+temp4
            temp7 = temp1+str(i+1)+temp6
            hehe = response.xpath(temp3).extract()
            xixi = response.xpath(temp5).extract()
            skillname = response.xpath(temp7).extract()
            a = []
            print(skillname[0],detail)
            for j in range(0, len(xixi)):
                s = xixi[j].strip()
                if len(s) > 0:
                    a.append(s)
            for j in range(0, len(a)):
                print(hehe[j],a[j])
            print("============")
