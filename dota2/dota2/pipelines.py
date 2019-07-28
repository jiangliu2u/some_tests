import redis
import json


class Dota2Pipeline(object):
    def __init__(self):
        self.db = redis.Redis(host='localhost', port=6379,
                              password="123456", decode_responses=True)

    def process_item(self, item, spider):
        name = item['name']
        name_cn = item['name_cn']
        skills = item['skills']
        skill_descs = item['skill_descs']
        skill_names = item['skill_names']
        hero = {}
        hero["abilities"] = {}
        hero["name"] = name
        hero["talent"] = item["talent"]
        hero["name_cn"] = name_cn
        hero["type"] = item['type']
        hero["attr"] = item["primary_attr"]

        for i in range(0, len(skills)):
            hero["abilities"][skill_names[i]]= {}
            hero["abilities"][skill_names[i]]['desc']= skill_descs[i]
            hero["abilities"][skill_names[i]]['detail']= skills[i]
            self.db.set("dota_heroes:"+name,
                        json.dumps(hero, ensure_ascii=False))
            self.db.lpush("dota_heroes_list", name)
