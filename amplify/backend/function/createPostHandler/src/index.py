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
        (`imageurl`, `name`, `caption`, `ingredients`, `recipe`, `tags`, `created_by`) 
        VALUES (%s, %s, %s, %s, %s, %s, %s);'''
  try:
    cursor.execute(sql, (event['url'], 
                      event['name'], 
                      event['caption'], 
                      json.dumps(event['ingredients']),
                      event['recipe'],
                      json.dumps(event['tags']),
                      event['createdBy']))
    connection.commit()
  except Exception as e:
    print(type(e).__name__, e.args)
    return {
      'statusCode': 400,
      'headers': {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
      },
      'body': json.dumps({
        "errorType": type(e).__name__,
        "errorMessage": e.args
      })
    }
    
  return {
    'statusCode': 201,
    'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
    },
    'body': json.dumps({
      "url": "this would be the url to the created post"
    })
  }