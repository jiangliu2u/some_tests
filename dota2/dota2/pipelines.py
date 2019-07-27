# -*- coding: utf-8 -*-


import redis


class Dota2Pipeline(object):
    def __init__(self):
        self.db = redis.Redis(host='localhost', port=6379,
                              password="1234", decode_responses=True)

    def process_item(self, item, spider):
        name = item['name']
        skills = item['skills']
        skill_names = item['skill_names']
        for i in range(0, len(skills)):
            self.db.hset(name, skill_names[i], skills[i])
