---
title: Amazon Web Services
columns: two
layout: commonTwo.hbs
description: Amazon Web Services
---

# {{title}}

There are four AWS integrations available:

| Integration name | Description |
| :--- | :--- |
| [AWS Lambda](#aws-lambda) | Serverless cloud computing service (via AWS API Gateway) |
| [AWS DynamoDB](#aws-dynamodb) | Managed NoSQL database |
| [AWS S3](#aws-s3) | Cloud storage (accessed via AWS Firehose) |
| [AWS SQS](#aws-sqs) | Message queueing service |


## AWS Lambda

### Lambda setup

1. Go to **Lambda** and click `Create function`.
2. Name your function and create it.
3. Update the code and make sure to deploy the changes.

### API Gateway setup

1. Go to **API Gateway** service and click on `Create API`.
2. Select `REST API` and `Build`.
3. Name the new API Gateway and `Create API`.
4. Click on `Create resource`.
    
![Create resource](/assets/images/integrations/aws/create-resource.png)
    
5. Name your resource, this will be part of the path in your API request
    
![Create resource](/assets/images/integrations/aws/create-resource-2.png)
    
6. Now create a Method, for this example we will use POST
    
![Create method](/assets/images/integrations/aws/create-method.png)
    
7. Select `Lambda function` as integration type and choose your lambda in the dropdown.
    
![Create method lambda](/assets/images/integrations/aws/create-method-lambda.png)
    
8. Once the method is created, take note of its ARN. You will need it to set the right permissions to invoke it in the IAM policy.
    
![Method execution](/assets/images/integrations/aws/method-execution.png)
    
9. Go back to your lambda function details and select `Deploy API`.
10. Select `*New stage*` option and name a first stage for the API.
    
![Deploy API](/assets/images/integrations/aws/deploy-api.png)
    
11. Once your stage is created, take not of the invoke URL, this is the URL needed to configure particle webhook.
    
![Invoke URL](/assets/images/integrations/aws/invoke-url.png)
    

## AWS DynamoDB

DynamoDB is a fully managed NoSQL database service by Amazon Web Services (AWS).

### Instructions

1. Obtain the ARN of your DynamoDB table from the AWS Management Console.
2. Ensure your AWS user has permissions to perform `dynamodb:PutItem` operations on the table.
3. In the webhook configuration, insert the ARN in the designated field and provide the AWS user's key pair for authentication.

## AWS Lambda

AWS Lambda is a serverless compute service that lets you run code without provisioning or managing servers.

### Instructions

1. Ensure your AWS user has the necessary permissions (**`execute-api:Invoke`**) for the Lambda function and API Gateway.
2. Set up an API Gateway to act as the trigger for your Lambda function if you haven't already.
3. Obtain the invoke URL of the API Gateway stage that connects to your Lambda function.
4. In the webhook configuration, provide the user's key pair for AWS authentication and the API Gateway stage invoke URL.

## AWS S3

AWS S3 is a scalable storage service, and AWS Kinesis Firehose is a service for delivering real-time streaming data to destinations such as S3.

### Instructions

1. Ensure your AWS user has the necessary permissions (**`firehose:PutRecord`**, **`firehose:PutRecordBatch`**) for the Kinesis Firehose stream.
2. Set up a Kinesis Firehose stream if not already done, and configure it to deliver data to your S3 bucket.
3. Obtain the name of your Kinesis Firehose stream.
4. In the webhook configuration, input the user's key pair for AWS authentication and the name of the Firehose stream to route data into your S3 bucket.

### S3 setup

1. Go to the S3 service and select `Create bucket`.
2. Note the bucket name.

### Firehose setup

1. Go to Amazon Data Firehose service and select `Create Firehose stream`.
2. Set `Direct PUT` as Source and `Amazon S3` as Destination.
    
![Firehose create](/assets/images/integrations/aws/firehose-create.png)
    
3. In **Destination settings** section set your S3 bucket as destination for the stream.
    
![Firehose destination](/assets/images/integrations/aws/firehose-destination.png)
    
4. IMPORTANT: In `New line delimiter`, select `Enabled`
5. Click on `Create Firehose stream` at the bottom of the page.
6. Note the newly created Firehose stream ARN.


### AWS SQS

AWS SQS (Simple Queue Service) is a fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications.

### Instructions

1. Ensure your AWS user has permissions to **`sqs:SendMessage`** for the desired SQS queue.
2. Create an SQS queue if you do not have one already, and obtain its URL from the AWS Management Console.
3. In the webhook configuration, provide the queue URL to specify where messages should be sent and the user's key pair for AWS authentication.

## AWS access configuration

### Policy creation

Go to ***Identity and Access Management*** (***IAM***) and in **Policies** section select `Create policy` and go to the JSON editor. 

- This is the base policy JSON with the minimal actions needed to write to the S3 bucket using a **Firehose stream**. Set the ARN of the Firebase stream as **Resource** in the policy and click `Next`.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "firehose:PutRecord",
        "firehose:PutRecordBatch"
      ],
      "Resource": "<FIREBASE ARN>"
    }
  ]
}
```
    
- This is the base policy JSON with the minimal actions needed to send messages to a **SQS queue**. Set the ARN of the queue as **Resource** in the policy and click `Next`.
    
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "sqs:SendMessage"
      ],
      "Resource": "<SQS ARN>"
    }
  ]
}
```
    
- This is the base policy JSON with the minimal actions needed to put items to a **DynamoDB table**. Set the ARN of the TABLE as **Resource** in the policy and click `Next`.
    
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem"
      ],
      "Resource": "<DYNAMO TABLE ARN>"
    }
  ]
}
```
    
- This is the base policy JSON with the minimal permission needed to invoke a **Lambda** through a POST method from an **API Gateway**. Set the ARN of the queue as **Resource** in the policy and click `Next`.
   
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "execute-api:Invoke"
      ],
      "Resource": "<POST METHOD ARN>"
    }
  ]
}
```

Set the ARN of the TABLE as **Resource** in the policy and click `Next`.

Finally, name your policy and click `Create policy` at the bottom of the page.

#### User creation

1. Go to ***Identity and Access Management*** (***IAM***) and in **User** section select `Create user`.
2. Set a name for the user and **do not** provide access to the AWS Console. Click `Next`.
3. Select `Attach policies directly`, select the policy policies created in the previous step and click `Next`.
    
![Attach policy](/assets/images/integrations/aws/attach-policy.png)
    
4. Click on `Create user`

#### Access Key pair creation

1. Go to ***Identity and Access Management*** (***IAM***) and in **User** section select the user you created in the previous step.
2. Click on `Create access key`.
3. Select `Third-party service`  and click `Next`.
4. Tag the keys at convenience. In next screen keep note of the key pair in a safe place and click on `Done`. This is the key pair needed to configure the particle webhook integrated with AWS.
