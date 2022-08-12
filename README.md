docker build -t rtspdockertest .


docker run -it rtspdockertest AWS_ACCESS_KEY_ID=AKIASA3V2VWZFEN4AA7T AWS_SECRET_ACCESS_KEY=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 RTSP_URL=rtsp://admin:Hik12345@192.168.1.70:554/Streaming/channels/101 STREAM_NAME=securiycammovileapp

docker run -it rtspdockertest bash

sudo docker run -it --network="host" --device=/dev/video0 546150905175
.dkr.ecr.us-west-2.amazonaws.com/kinesis-video-producer-sdk-cpp-amazon-linux /bin/bash

sudo docker run -it --network="host" --device=/dev/video0 546150905175.dkr.ecr.us-west-2.amazonaws.com/kinesis-video-producer-sdk-cpp-amazon-linux /bin/bash


docker network create -d br2

apt-get update && apt-get install iputils-ping -y



docker pull 546150905175.dkr.ecr.us-west-2.amazonaws.com/kinesis-video-producer-sdk-cpp-amazon-linux:latest

docker run -it --net host -e AWS_ACCESS_KEY_ID=AKIASA3V2VWZFEN4AA7T -e AWS_SECRET_ACCESS_KEY=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 -e LOCATION=rtsp://admin:Hik12345@192.168.1.70:554/Streaming/channels/101 -e STREAM_NAME=MyKVStream 546150905175.dkr.ecr.us-west-2.amazonaws.com/kinesis-video-producer-sdk-cpp-amazon-linux:latest

/opt/amazon-kinesis-video-streams-producer-sdk-cpp/open-source/local/lib
/opt/amazon-kinesis-video-streams-producer-sdk-cpp/open-source/local/bin

export LD_LIBRARY_PATH=/opt/amazon-kinesis-video-streams-producer-sdk-cpp/open-source/local/lib:$LD_LIBRARY_PATH
export PATH=/opt/amazon-kinesis-video-streams-producer-sdk-cpp/open-source/local/bin:$PATH
export GST_PLUGIN_PATH=/opt/amazon-kinesis-video-streams-producer-sdk-cpp/open-source/local/lib:$GST_PLUGIN_PATH

gst-launch-1.0

gst-launch-1.0 rtspsrc location="rtsp://admin:Hik12345@192.168.1.70:554/h264/ch1/main/av_stream" ! rtph264depay ! h264parse ! kvssink stream-name="MyKVStream" storage-size=512 access-key="AKIASA3V2VWZFEN4AA7T" secret-key="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"

gst-launch-1.0 rtspsrc location="rtsp://admin:Hik12345@192.168.1.70:554/h264Preview_01_sub" short-header=TRUE ! rtph264depay ! video/x-h264, format=avc,alignment=au ! kvssink stream-name="securiycammovileapp" storage-size=512 access-key="AKIASA3V2VWZFEN4AA7T" secret-key="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"

gst-launch-1.0 -v rtspsrc protocols=tcp location="rtsp://admin:Hik12345@192.168.1.70:554/Streaming/channels/101" short-header=TRUE ! rtph264depay ! h264parse ! kvssink stream-name="MyKVStream" aws-region="us-east-1"

protocols=tcp

{
    "StreamARN": "arn:aws:kinesisvideo:us-east-1:139296681394:stream/MyKVStream/1660280566199"
}