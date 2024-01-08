import json
import os
import gremlin_python
from gremlin_python.driver import client, serializer

endpoint = os.environ['NEPTUNE_ENDPOINT']
port = os.environ['NEPTUNE_PORT']

# Connect to Neptune
db = client.Client(f"wss://{endpoint}:{port}/gremlin", "g")

valid_attributes = [
    "firstName",
    "lastName",
    "username",
    "DOB",
    "gender",
    "bio"
]

def lambda_handler(event, context):
    userData = json.loads(event["body"])["attributes"]
    username = event["pathParameters"]["userId"]

    # Get vertex ID
    query = f"g.V().has('username', '{username}').id();"
    vertexID = db.submit(query).all().result()

    result = ""
    statusCode = 500
    if len(vertexID) == 0:
        result = f"Server failed to find user : {username}"
        statusCode = 404
    elif len(userData) > 0:
        for attribute in userData:
            newValue = userData[attribute]
            query = f"g.V({vertexID}).property(single, '{attribute}', '{newValue}');"
            # check if attribute is valid
            if attribute in valid_attributes:
                try:
                    db.submit(query)
                    result += f"User attribute : \"{attribute}\" successfully changed to : \"{newValue}\"\n"
                    # if one query works, status code is 200, else status code is 500
                    statusCode = 200
                except:
                    result += f"Server failed at modifying attribute : \"{attribute}\" for user : \"{username}\"\n"
            else:
                result += f"Attribute : \"{attribute}\" is not a valid attribute\n"
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