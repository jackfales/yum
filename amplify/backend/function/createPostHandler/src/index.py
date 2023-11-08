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
        (`imageurl`, `name`, `caption`, `ingredients`, `recipe`, `tags`) 
        VALUES (%s, %s, %s, %s, %s, %s);'''
  cursor.execute(sql, ('https://picsum.photos/200/300', 
                      event['name'], 
                      event['caption'], 
                      json.dumps(event['ingredients']),
                      event['recipe'],
                      json.dumps(event['tags'])
                      ))
  connection.commit()
  return {
    'statusCode': 200,
    'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
    },
    'body': json.dumps('Success?')
  }