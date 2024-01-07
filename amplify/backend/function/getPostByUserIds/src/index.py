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
  user_ids = event['userIds']

  # Formats the query with the correct number of placeholders for the parameters
  placeholders = ", ".join(["%s"] * len(user_ids))
  sql = """SELECT imageurl, name, caption, ingredients, recipe, tags, created_by 
  FROM posts
  WHERE created_by IN ({}) 
  ORDER BY created_at DESC
  LIMIT {}
  OFFSET {}""".format(placeholders, "%s", "%s")

  try:
    # Concatenate all parameters into a single array
    parameters = user_ids + [event['pageSize']] + [(event['pageCount'] * event['pageSize'])]
    cursor.execute(sql, parameters)
    results = cursor.fetchall()

    return {
    'statusCode': 201,
    'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
    },
    'body': json.dumps({
      "posts": results
    })
  }
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
  