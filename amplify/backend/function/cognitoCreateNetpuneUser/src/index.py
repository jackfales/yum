import json

def handler(event, context):
  userData = event["request"]["userAttributes"]
  
  firstName = userData["firstName"]
  lastName = userData["lastName"]
  dob = userData["DOB"]
  username = userData["username"]
  email = userData["email"]
  gender = userData["gender"]
  bio = userData["bio"]

  
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps('Hello from your new Amplify Python lambda!')
  }