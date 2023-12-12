import json
import os
import gremlin_python
from gremlin_python.driver import client, serializer

def lambda_handler(event, context):
    endpoint = os.environ['NEPTUNE_ENDPOINT']
    port = os.environ['NEPTUNE_PORT']
    db = client.Client(f"wss://{endpoint}:{port}/gremlin", "g")
    
    # Queries username of all Users
    query = "g.V().hasLabel('user').values('username');"

    #TODO: Once we implement edges and IDs, the query should be something like:
    # query = "g.V().hasLabel('user').out('follows').id();
        
    result = db.submit(query).all().result()
    print(result)
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps('Hello from your new Amplify Python lambda!')
    }