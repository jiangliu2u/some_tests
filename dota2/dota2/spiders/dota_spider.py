import scrapy
from items import Dota2Item
import re


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
            url = url.strip()
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

        skill_names = []  # 技能名称

        for i in names:
            name = i.strip()
            name = name.replace(" ", "")
            skill_names.append(name)

        skill_descs = []  # 技能描述

        skills = []  # 技能

        for j in range(5, len(div)+1):
            num = str(j)
            pat_detail = "//*[@id='accordion']/div[position()="+num + \
                " and @style='margin-left:auto;margin-right:auto;padding: 10px;']/text()"
            detail = response.xpath(pat_detail).extract()

            pat_desc = "//*[@id='accordion']/div[position()="+num + \
                " and @style='margin-left:auto;margin-right:auto;padding: 10px;']/span[1]/text()"
            desc = response.xpath(pat_desc).extract()

            for ds in desc:
                ds = ds.strip()
                ds = ds.replace(" ", "")
                ds = ds.replace("\n", "")
                skill_descs.append(ds)

            pat_mana = "//*[@id='accordion']/div[" + \
                num + "]/div[@class='cooldownMana']/div[@class='mana']/text()"
            pat_cooldown = "//*[@id='accordion']/div[" + \
                num + \
                "]/div[@class='cooldownMana']/div[@class='cooldown']/text()"
            mana = response.xpath(pat_mana).extract()  # 技能魔法消耗
            cooldown = response.xpath(pat_cooldown).extract()  # 技能冷却时间

            pat_extra = "//*[@id='accordion']/div[" + \
                num + "]/span[@class='attribVal']"
            extra = response.xpath(pat_extra).extract()
            pat = re.compile(".*?>(.*?)<.*?", re.S)

            value = []  # 技能数值以及伤害类型
            if len(extra) > 0:
                for e in extra:
                    r = re.findall(pat, e.strip())
                    for l in r:
                        if len(l) > 0:
                            value.append(l)

            if len(detail) > 0 and len(value) > 0:
                a = ""
                for i in range(0, len(value)):
                    a = a + detail[i].strip()+" " + value[i].strip()+","
                if len(mana) > 0:
                    a = a + "魔法消耗:" + mana[0].strip()+","
                if len(cooldown) > 0:
                    a = a + "冷却时间:" + cooldown[0].strip()+","
                skills.append(a)

        talent = {}  # 天赋
        pat_talent = "//*[@id='accordion']/div[@class='talent']/div[@class='talent_self']"
        title = re.compile('.*?title="(.*?)".*?')
        lvl = re.compile('.*?>(\d+)<.*?')
        ts = response.xpath(pat_talent).extract()
        for t in ts:
            titles = re.findall(title, t)
            lvls = re.findall(lvl, t)
            talent[lvls[0]] = titles[0]+","+titles[1]
        item['talent'] = talent

        # 属性值
        agility = response.xpath(
            '//*[@id="agi"]/text()').extract()[0].replace(" ", "").replace("\n", "")
        strength = response.xpath(
            '//*[@id="str"]/text()').extract()[0].replace(" ", "").replace("\n", "")
        intelligence = response.xpath(
            '//*[@id="int"]/text()').extract()[0].replace(" ", "").replace("\n", "")
        item['primary_attr'] = {"敏捷": agility,
                                "力量": strength, "智力": intelligence}

        attr_title = response.xpath(
            '//*[@id="accordion"]/div[3]/div[@class="hero-stats"]/text()').extract()
        attrs = response.xpath(
            '//*[@id="accordion"]/div[3]/div[@class="hero-stats"]').extract()
        attr = []
        patattr = re.compile(".*?<span.*?>(.*?)</span>.*?", re.S)
        for i in attrs:
            i = i.replace("\n", "")
            result = re.findall(patattr, i)
            attr.append(result[0].strip())
        for i in range(0, len(attr_title)):
            title = attr_title[i].strip()
            title = title.replace(" ", "")
            title = title.replace("\n", "")
            item['primary_attr'][title] = attr[i].strip()

        heroname_cn = response.xpath(
            '//*[@id="accordion"]/div[1]/div/text()').extract()[0]
        item['name'] = heroname
        item['name_cn'] = heroname_cn
        item['skills'] = skills
        item['skill_names'] = skill_names
        item['skill_descs'] = skill_descs
        yield item
