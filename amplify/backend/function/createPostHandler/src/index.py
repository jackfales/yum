import json
import os
import pymysql

connection = pymysql.connect(host = os.environ['HOST'],
                             user = os.environ['USER'],
                             password = os.environ['PASSWORD'],
                             database = os.environ['DATABASE'])

def lambda_handler(event, context):
  cursor = connection.cursor()

  sql = '''INSERT INTO posts 
        (`imageurl`, `name`, `description`, `ingredients`, `recipe`, `tags`) 
        VALUES (%s, %s, %s, %s, %s, %s);'''
  
  ingredients = {
    'chicken': '2 lbs',
    'soy sauce': '1/2 tablespoon',
    'brown sugar': '1/4 cup'
  }
  tags = {
    'tag1': 'chicken',
    'tag2': 'asian'
  }
  
  cursor.execute(sql, ('https://picsum.photos/200/300', 
                      'julia', 
                      'second description', 
                      json.dumps(ingredients),
                      'this is a really shitty recipe',
                      json.dumps(tags)
                      ))
  
  connection.commit(),