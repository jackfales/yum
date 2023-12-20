import json
import os
import gremlin_python
from gremlin_python.driver import client, serializer

def lambda_handler(event, context):
    endpoint = os.environ['NEPTUNE_ENDPOINT']
    port = os.environ['NEPTUNE_PORT']

    # Connect to Neptune
    db = client.Client(f"wss://{endpoint}:{port}/gremlin", "g")

    userData = event["userInfo"]
    firstName = userData["firstName"]
    lastName = userData["lastName"]
    dob = userData["DOB"]
    username = userData["username"]
    email = userData["email"]
    gender = userData["gender"]
    bio = userData["bio"]

    # For readability
    query = f"g.addV('user').property('firstName', '{firstName}').property('lastName', '{lastName}').property('DOB', '{dob}').property('username', '{username}').property('email', '{email}').property('gender', '{gender}').property('bio', '{bio}');"
        
    try:
        db.submit(query)
        result = "Query excecuted successfully"
        statusCode = 200
    except:
        result = "Query failed"
        statusCode = 400
        
    # Process and return results
    return {
        "statusCode": statusCode,
        "body": json.dumps(result)
    }
