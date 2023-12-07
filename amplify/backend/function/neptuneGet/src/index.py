import json
import os
import gremlin_python
from gremlin_python.driver import client, serializer

def lambda_handler(event, context):
    endpoint = os.environ['NEPTUNE_ENDPOINT']
    port = os.environ['NEPTUNE_PORT']

    # Connect to Neptune
    db = client.Client(f"wss://{endpoint}:{port}/gremlin", "g")

    username = event["pathParameters"]["userId"]
    query = f"g.V().hasLabel('user').has('username', '{username}').values();"
    
    try:
        result = db.submit(query).all().result()
        statusCode = 200
    except:
        result = "Query failed"
        statusCode = 400

    # Process and return results
    return {
        "statusCode": statusCode,
        "body": json.dumps(result)
    }
