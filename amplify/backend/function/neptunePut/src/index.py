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

    def db_modify_user(userData):
        username = userData["user"]
        attribute = userData["attribute"]
        newValue = userData["newValue"]
        # Get vertex ID
        query = f"g.V().has('username', '{username}').id();"
        vertexID = db.submit(query).all().result()
        # Add new value
        query = f"g.V({vertexID}).property(single, '{attribute}', '{newValue}');"
        db.submit(query)
        return "Query executed successfully"

    result = ""

    if method == "PUT":
        userData = event["userInfo"]
        result = db_modify_user(userData)
    else:
        return {
            "statusCode": 400,
            "body": "Bad Request: \"method\" parameter must be \"PUT\"."
        }

    # Process and return results
    return {
        "statusCode": 200,
        "body": result
    }
