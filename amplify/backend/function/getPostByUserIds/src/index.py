import json
import os
import pymysql

# Establish connection to AWS RDS MySQL
connection = pymysql.connect(host = os.environ['HOST'],
                             user = os.environ['USER'],
                             password = os.environ['PASSWORD'],
                             database = os.environ['DATABASE'])

def lambda_handler(event, context):
  cursor = connection.cursor()
  user_ids = json.loads(event["body"])["userIds"]
  page = int(event["queryStringParameters"]["page"])
  pageSize = int(event["queryStringParameters"]["pageSize"])

  # Formats the query with the correct number of placeholders for the parameters
  placeholders = ", ".join(["%s"] * len(user_ids))
  sql = """SELECT imageurl, name, caption, ingredients, recipe, tags, created_by 
  FROM posts
  WHERE created_by IN ({}) 
  ORDER BY created_at DESC
  LIMIT {}
  OFFSET {}""".format(placeholders, "%s", "%s")

  try:
    # Concatenate parameters and execute query
    parameters = user_ids + [pageSize] + [(page * pageSize)]
    cursor.execute(sql, parameters)
    results = cursor.fetchall()

    return {
      'isBase64Encoded': False,
      'statusCode': 201,
      'headers': {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
      },
      'multiValueHeaders': {},
      'body': json.dumps({
        "posts": results
        })
  }
  except Exception as e:
    print(type(e).__name__, e.args)

    return {
      'isBase64Encoded': False,
      'statusCode': 400,
      'headers': {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
      },
      'multiValueHeaders': {},
      'body': json.dumps({
        "errorType": type(e).__name__,
        "errorMessage": e.args
      })
    }
  