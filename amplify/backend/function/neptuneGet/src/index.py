import json
import os
import gremlin_python
from gremlin_python.driver import client, serializer

def lambda_handler(event, context):
    endpoint = os.environ['NEPTUNE_ENDPOINT']
    port = os.environ['NEPTUNE_PORT']

    try:
        method = event["method"]
    except:
        return {
        "statusCode": 400,
        "body": "Bad Request: \"method\" parameter required."
        }

    # Connect to Neptune
    db = client.Client(f"wss://{endpoint}:{port}/gremlin", "g")

    # DB rest functions
    def db_get_user(username):
        query = f"g.V().hasLabel('user').has('username', '{username}').values();"
        return db.submit(query).all().result()

    result = ""

    if method == "GET":
        username = event["user"]
        result = db_get_user(username)
    else:
        return {
            "statusCode": 400,
            "body": "Bad Request: \"method\" parameter must be \"GET\"."
        }

    # Process and return results
    return {
        "statusCode": 200,
        "body": result
    }
