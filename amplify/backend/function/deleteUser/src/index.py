import json
import os
import gremlin_python
from gremlin_python.driver import client, serializer

endpoint = os.environ['NEPTUNE_ENDPOINT']
port = os.environ['NEPTUNE_PORT']

# Connect to Neptune
db = client.Client(f"wss://{endpoint}:{port}/gremlin", "g")

def lambda_handler(event, context):
    userID = event["pathParameters"]["userId"]

     # Get vertex ID
    query = f"g.V().has('id', '{userID}').id();"
    vertexID = db.submit(query).all().result()

    query = f"g.V({vertexID}).drop()"
    try:
        if len(vertexID) == 0:
            result = f"Server failed to find user : {userID}"
            statusCode = 404
        else:
            db.submit(query)
            result = f"User : {userID} deleted successfully"
            statusCode = 200
    except:
        result = f"Server failed to delete user : {userID}"
        statusCode = 500

    # Process and return results
    response = {
        "isBase64Encoded": False,
        "statusCode": statusCode,
        "headers": {},
        "multiValueHeaders": {},
        "body": json.dumps(result)
    }

    return response
