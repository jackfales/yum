import json
import os
import gremlin_python
from gremlin_python.driver import client, serializer

def lambda_handler(event, context):
    endpoint = os.environ['NEPTUNE_ENDPOINT']
    port = os.environ['NEPTUNE_PORT']

    # Connect to Neptune
    db = client.Client(f"wss://{endpoint}:{port}/gremlin", "g")

    userData = json.loads(event["body"])["userInfo"]
    username = event["pathParameters"]["userId"]
    attribute = userData["attribute"]
    newValue = userData["newValue"]
    # Get vertex ID
    query = f"g.V().has('username', '{username}').id();"
    vertexID = db.submit(query).all().result()
    # Add new value
    query = f"g.V({vertexID}).property(single, '{attribute}', '{newValue}');"

    try:
        db.submit(query)
        result = "Query submitted successfully"
        statusCode = 200
    except:
        result = "Query failed"
        statusCode = 400

    # Process and return results
    return {
        "statusCode": statusCode,
        "body": json.dumps(result)
    }
