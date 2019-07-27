import scrapy
from items import Dota2Item


class Dota2(scrapy.Spider):
    name = "dota2"
    home = "http://www.dotamax.com/hero/"
    url = "http://www.dotamax.com"
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36", "Accept-Language": "zh-CN,zh;q=0.9",
               "Host": "www.dotamax.com", "Referer": "http://www.dotamax.com/hero/rate/"}

    def start_requests(self):
        yield scrapy.Request(url=self.home, callback=self.parse_hero, headers=self.headers)

    def parse_hero(self, response):
        pat_heroes = "/html/body/div[2]/div[3]/div[1]/div[2]/div[2]/div[@class='hero-list-hero Unused-Hero']/@onclick"
        heroes = response.xpath(pat_heroes).extract()
        print(len(heroes))
        for i in heroes:
            i = i.replace("DoNav('", "")
            i = i.replace("');", "")
            i = i.replace("'", "")
            i = i.replace(")", "")
            url = self.url+i
            url=url.strip()
            yield scrapy.Request(url=url, callback=self.parse_detail, headers=self.headers)

    def parse_detail(self, response):
        url = response.url
        heroname = url.replace("http://www.dotamax.com/hero/detail/", "")
        heroname = heroname.replace("/", "")
        item = Dota2Item()
        div = response.xpath(
            "//*[@id='accordion']/div").extract()
        pat_names = "//*[@id='accordion']/div[position()>4 and @style='font-weight: bold;margin-left: 10px;margin-top:10px;width: 93%;height: 62px; line-height: 42px;font-size: 16px;font-weight: 500;']/text()"
        names = response.xpath(pat_names).extract()
        skill_names = []
        for i in names:
            name = i.strip()
            name = name.replace(" ", "")
            skill_names.append(name)
        skills = []

        for j in range(5, len(div)+1):
            num = str(j)
            pat_detail = "//*[@id='accordion']/div[position()="+num + \
                " and @style='margin-left:auto;margin-right:auto;padding: 10px;']/text()"
            detail = response.xpath(pat_detail).extract()
            pat_value = "//*[@id='accordion']/div[" + \
                num + "]/span[@class='attribVal']/text()"
            pat_mana = "//*[@id='accordion']/div[" + \
                num + "]/div[@class='cooldownMana']/div[@class='mana']/text()"
            pat_cooldown = "//*[@id='accordion']/div[" + \
                num + \
                "]/div[@class='cooldownMana']/div[@class='cooldown']/text()"
            mana = response.xpath(pat_mana).extract()
            cooldown = response.xpath(pat_cooldown).extract()
            value = response.xpath(pat_value).extract()
            if len(detail) > 0 and len(value) > 0:
                if detail[-1] == "伤害类型":
                    detail = detail[:-1]
                a = ""
                for i in range(0, len(value)):
                    a = a + detail[i].strip()+" " + value[i].strip()+"\n"
                if len(mana) > 0:
                    a = a + "魔法消耗:" + mana[0].strip()+"\n"
                if len(cooldown) > 0:
                    a = a + "冷却时间:" + cooldown[0].strip()+"\n"
                skills.append(a)
        item['name'] = heroname
        item['skills'] = skills
        item['skill_names'] = skill_names
        yield item
