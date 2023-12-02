import json
import gremlin_python
from gremlin_python.driver import client, serializer

def lambda_handler(event, context):

    try:
        method = event["action"]
    except:
        return {
        "statusCode": 78,
        "body": "Method not found in request object."
        }

    # Neptune configuration
    neptune_endpoint = "user-profiles-dev.cluster-cdbuvb1lszp1.us-west-2.neptune.amazonaws.com"
    neptune_port = 8182

    # Connect to Neptune
    db = client.Client(f"wss://{neptune_endpoint}:{neptune_port}/gremlin", "g")

    # DB rest functions
    def db_get_user(username):
        query = f"g.V().hasLabel('user').has('username', '{username}').values();"
        return db.submit(query).all().result()

    def db_create_user(userData):
        firstName = userData["firstName"]
        lastName = userData["lastName"]
        dob = userData["DOB"]
        username = userData["username"]
        query = f"g.addV('user').property('firstName', '{firstName}').property('lastName', '{lastName}').property('DOB', '{dob}').property('username', '{username}');"
        
        db.submit(query)
            
        return "Query excecuted successfully"

    def db_modify_user(userData):
        username = userData["user"]
        attribute = userData["attribute"]
        newValue = userData["newValue"]
        # Get vertex ID
        query = f"g.V().has('username', '{username}').id();"
        vertexID = db.submit(query).all().result()
        # Add new value
        query = f"g.V({vertexID}).property(single, '{attribute}', '{newValue}');"
        db.submit(query)
        return "Query executed successfully"

    def db_delete_user(username):
        query = f"g.V().hasLabel('user').has('username', '{username}').drop()"
        db.submit(query)
        return "Query executed successfully"

    result = ""

    if method == "get-user":
        username = event["user"]
        result = db_get_user(username)
    elif method == "create-user":
        userInfo = event["userInfo"]
        result = db_create_user(userInfo)
    elif method == "modify-user":
        userInfo = event["userInfo"]
        result = db_modify_user(userInfo)
    elif method == "delete-user":
        username = event["user"]
        result = db_delete_user(username)
    else:
        return {
            "statusCode": 404,
            "body": "page not found"
        }

    # Process and return results
    return {
        "statusCode": 200,
        "body": result
    }
