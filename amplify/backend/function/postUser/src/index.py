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

    # Inputs not required by cognito
    dob = ""
    gender = ""
    bio = ""

    # Add a user
    query = f"g.addV('user').property('firstName', '{firstName}').property('lastName', '{lastName}').property('DOB', '{dob}').property('username', '{username}').property('email', '{email}').property('gender', '{gender}').property('bio', '{bio}');"
    db.submit(query)
    # Get the user's vertex ID
    query = f"g.V().has('username', '{username}').id();"
    vertexID = db.submit(query).all().result()
    # Add the vertex ID as a user property
    query = f"g.V({vertexID}).property('id', '{vertexID[0]}');"
    db.submit(query)
        
    # Process and return results
    return event
