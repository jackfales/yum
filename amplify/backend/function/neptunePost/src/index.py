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

    def db_create_user(userData):
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
            return "Query excecuted successfully"
        except:
            return "Query failed"
        

    result = ""

    if method == "POST":
        userData = event["userInfo"]
        result = db_create_user(userData)
    else:
        return {
            "statusCode": 400,
            "body": "Bad Request: \"method\" parameter must be \"POST\"."
        }

    # Process and return results
    return {
        "statusCode": 200,
        "body": result
    }
