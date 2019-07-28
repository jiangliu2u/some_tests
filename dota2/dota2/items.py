# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class Dota2Item(scrapy.Item):
    name = scrapy.Field()
    name_cn = scrapy.Field()
    skills = scrapy.Field()
    skill_names = scrapy.Field()
    skill_descs = scrapy.Field()
    talent = scrapy.Field()
    primary_attr = scrapy.Field()
    type = scrapy.Field()