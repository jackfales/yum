import json
import os
import gremlin_python
from gremlin_python.driver import client, serializer

endpoint = os.environ['NEPTUNE_ENDPOINT']
port = os.environ['NEPTUNE_PORT']

# Connect to Neptune
db = client.Client(f"wss://{endpoint}:{port}/gremlin", "g")

def lambda_handler(event, context):
    userData = event["request"]["userAttributes"]
    # Inputs currently required by cognito
    firstName = userData["given_name"]
    lastName = userData["family_name"]
    username = userData["preferred_username"]
    email = userData["email"]
    sub = userData["sub"]

    # Add a user
    query = f"g.addV('user').property('firstName', '{firstName}').property('lastName', '{lastName}').property('DOB', '').property('username', '{username}').property('email', '{email}').property('gender', '').property('bio', '').property('id', '{sub}');"
    db.submit(query)
        
    # Process and return results
    return event
