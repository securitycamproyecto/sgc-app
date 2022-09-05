aws ecr get-login-password --region us-west-2 | docker login -u AWS --password-stdin https://546150905175.dkr.ecr.us-west-2.amazonaws.com

docker pull 546150905175.dkr.ecr.us-west-2.amazonaws.com/kinesis-video-producer-sdk-cpp-amazon-linux:latest

docker run -it --net host -e AWS_ACCESS_KEY_ID=AKIASA3V2VWZFEN4AA7T -e AWS_SECRET_ACCESS_KEY=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 -e LOCATION=rtsp://admin:Hik12345@192.168.1.70:554/Streaming/channels/101 -e STREAM_NAME=MyKVStream 546150905175.dkr.ecr.us-west-2.amazonaws.com/kinesis-video-producer-sdk-cpp-amazon-linux:latest

/opt/amazon-kinesis-video-streams-producer-sdk-cpp/open-source/local/lib
/opt/amazon-kinesis-video-streams-producer-sdk-cpp/open-source/local/bin

export LD_LIBRARY_PATH=/opt/amazon-kinesis-video-streams-producer-sdk-cpp/open-source/local/lib:$LD_LIBRARY_PATH
export PATH=/opt/amazon-kinesis-video-streams-producer-sdk-cpp/open-source/local/bin:$PATH
export GST_PLUGIN_PATH=/opt/amazon-kinesis-video-streams-producer-sdk-cpp/open-source/local/lib:$GST_PLUGIN_PATH

gst-launch-1.0

gst-launch-1.0 -v rtspsrc protocols=tcp location="rtsp://admin:Hik12345@192.168.1.70:554/Streaming/channels/101" short-header=TRUE ! rtph264depay ! h264parse ! kvssink stream-name="MyKVStream" aws-region="us-east-1"

protocols=tcp

react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/build/intermediates/res/merged/release/

====================================
REKOGNITION

aws rekognition create-collection --collection-id "MyCollection"

{
    "StatusCode": 200,
    "CollectionArn": "aws:rekognition:us-east-1:139296681394:collection/MyCollection",
    "FaceModelVersion": "6.0"
}

aws rekognition create-stream-processor --input "KinesisVideoStream={Arn=arn:aws:kinesisvideo:us-east-1:139296681394:stream/MyKVStream/1660280566199}" --name MyStreamProcessor --settings "FaceSearch={CollectionId=MyCollection,FaceMatchThreshold=50.0}" --role-arn "arn:aws:iam::139296681394:role/Rekognition" --stream-processor-output "KinesisDataStream={Arn=arn:aws:kinesis:us-east-1:139296681394:stream/MyDataStream}"

{
    "StreamProcessorArn": "arn:aws:rekognition:us-east-1:139296681394:streamprocessor/MyStreamProcessor"
}

aws rekognition index-faces --image "S3Object={Bucket=myrekognitioncollections,Name=jersonmiranda.jpg}" --collection-id "MyCollection" --max-faces 1 --quality-filter "AUTO" --detection-attributes "ALL" --external-image-id "jersonmiranda.jpg" 

aws rekognition start-stream-processor --name MyStreamProcessor

{
    "SessionId": "ce8b07da-3a35-458a-b989-6230dde2193d"
}

====================================