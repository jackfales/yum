import json
import os
import gremlin_python
from gremlin_python.driver import client, serializer

endpoint = os.environ['NEPTUNE_ENDPOINT']
port = os.environ['NEPTUNE_PORT']

# Connect to Neptune
db = client.Client(f"wss://{endpoint}:{port}/gremlin", "g")

def lambda_handler(event, context):
    username = event["pathParameters"]["userId"]
    query = f"g.V().hasLabel('user').has('username', '{username}').valueMap();"
    
    try:
        result = list(db.submit(query))
        if len(result) == 0:
            result = f"Server failed to find user : {username}"
            statusCode = 404
        else:
            result = result[0][0]
            statusCode = 200
    except:
        result = "Unknown server error"
        statusCode = 500

    response = {
        "isBase64Encoded": False,
        "statusCode": statusCode,
        "headers": {},
        "multiValueHeaders": {},
        "body": json.dumps(result)
    }

    return response
