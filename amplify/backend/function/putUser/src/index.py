import json
import os
import gremlin_python
from gremlin_python.driver import client, serializer

endpoint = os.environ['NEPTUNE_ENDPOINT']
port = os.environ['NEPTUNE_PORT']

# Connect to Neptune
db = client.Client(f"wss://{endpoint}:{port}/gremlin", "g")

def lambda_handler(event, context):
    userData = json.loads(event["body"])["attributes"]
    username = event["pathParameters"]["userId"]

    # Get vertex ID
    query = f"g.V().has('username', '{username}').id();"
    vertexID = db.submit(query).all().result()
    result = ""

    if len(userData) > 0:
        for attribute in userData:
            newValue = userData[attribute]
            # Add new value
            query = f"g.V({vertexID}).property(single, '{attribute}', '{newValue}');"
            try:
                if len(vertexID) == 0:
                    result = f"Server failed to find user : {username}"
                    statusCode = 404
                    break
                else:
                    db.submit(query)
                    result += f"User attribute : \"{attribute}\" successfully changed to : \"{newValue}\"\n"
                    statusCode = 200
            except:
                result += f"Server failed at modifying attribute : \"{attribute}\" for user : \"{username}\"\n"
                statusCode = 500
    else:
        result = f"No changes were made to user : \"{username}\""
        statusCode = 200

    # Process and return results
    response = {
        "isBase64Encoded": False,
        "statusCode": statusCode,
        "headers": {},
        "multiValueHeaders": {},
        "body": json.dumps(result)
    }
    
    return response
