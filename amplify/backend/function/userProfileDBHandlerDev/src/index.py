import gremlin_python
from gremlin_python.driver import client, serializer

def lambda_handler(event, context):
    
    # Neptune configuration
    neptune_endpoint = "user-profiles-dev.cluster-cdbuvb1lszp1.us-west-2.neptune.amazonaws.com"
    neptune_port = 8182

    # Connect to Neptune
    db = client.Client(f"wss://{neptune_endpoint}:{neptune_port}/gremlin", "g")

    # DB rest functions
    def db_get(username):
        query = f"g.V().hasLabel('user').values('{username}');"
        return db.submit(query)

    def db_put(username):
        query = f"g.V().hasLabel('user').values('{username}');"
        return db.submit(query)

    def db_delete(username):
        query = f"g.V().hasLabel('user').values('{username}');"
        return db.submit(query)

    def db_post(username):
        query = f"g.V().hasLabel('user').values('{username}');"
        return db.submit(query)


    path = event["pathParameters"]["proxy"]
    event_payload = event.get('payload')
    result = ""

    if path == "get":
        result = db_get(event_payload)
    elif path == "put":
        result = db_put(event_payload)
    elif path == "delete":
        result = db_delete(event_payload)
    elif path == "post":
        result = db_post(event_payload)
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
