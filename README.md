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

{
    "FaceRecords": [
        {
            "Face": {
                "FaceId": "acda951a-0896-4adc-95c4-86ef8cd2032f",
                "BoundingBox": {
                    "Width": 0.15692982077598572,
                    "Height": 0.1976355016231537,
                    "Left": 0.3578270971775055,
                    "Top": 0.07094836235046387
                },
                "ImageId": "128a8017-75ce-3bc3-8dd9-5c3a28c63a3d",
                "ExternalImageId": "jersonmiranda.jpg",
                "Confidence": 99.9817886352539
            },
            "FaceDetail": {
                "BoundingBox": {
                    "Width": 0.15692982077598572,
                    "Height": 0.1976355016231537,
                    "Left": 0.3578270971775055,
                    "Top": 0.07094836235046387
                },
                "AgeRange": {
                    "Low": 23,
                    "High": 33
                },
                "Smile": {
                    "Value": true,
                    "Confidence": 63.9111328125
                },
                "Eyeglasses": {
                    "Value": false,
                    "Confidence": 97.62515258789062
                },
                "Sunglasses": {
                    "Value": false,
                    "Confidence": 99.99667358398438
                },
                "Gender": {
                    "Value": "Male",
                    "Confidence": 99.81134796142578
                },
                "Beard": {
                    "Value": false,
                    "Confidence": 88.79423522949219
                },
                "Mustache": {
                    "Value": false,
                    "Confidence": 97.85408020019531
                },
                "EyesOpen": {
                    "Value": true,
                    "Confidence": 80.85399627685547
                },
                "MouthOpen": {
                    "Value": true,
                    "Confidence": 55.72552490234375
                },
                "Emotions": [
                    {
                        "Type": "HAPPY",
                        "Confidence": 90.83807373046875
                    },
                    {
                        "Type": "SURPRISED",
                        "Confidence": 6.5024590492248535
                    },
                    {
                        "Type": "FEAR",
                        "Confidence": 5.959718227386475
                    },
                    {
                        "Type": "CALM",
                        "Confidence": 5.253617286682129
                    },
                    {
                        "Type": "SAD",
                        "Confidence": 2.2960495948791504
                    },
                    {
                        "Type": "ANGRY",
                        "Confidence": 1.4808478355407715
                    },
                    {
                        "Type": "CONFUSED",
                        "Confidence": 0.6648086309432983
                    },
                    {
                        "Type": "DISGUSTED",
                        "Confidence": 0.5667039155960083
                    }
                ],
                "Landmarks": [
                    {
                        "Type": "eyeLeft",
                        "X": 0.3962966203689575,
                        "Y": 0.15076768398284912
                    },
                    {
                        "Type": "eyeRight",
                        "X": 0.4583314061164856,
                        "Y": 0.13405437767505646
                    },
                    {
                        "Type": "mouthLeft",
                        "X": 0.4165467321872711,
                        "Y": 0.21419109404087067
                    },
                    {
                        "Type": "mouthRight",
                        "X": 0.468021959066391,
                        "Y": 0.20014892518520355
                    },
                    {
                        "Type": "nose",
                        "X": 0.4334810972213745,
                        "Y": 0.16262109577655792
                    },
                    {
                        "Type": "leftEyeBrowLeft",
                        "X": 0.3703147768974304,
                        "Y": 0.1464523822069168
                    },
                    {
                        "Type": "leftEyeBrowRight",
                        "X": 0.40391772985458374,
                        "Y": 0.12267374247312546
                    },
                    {
                        "Type": "leftEyeBrowUp",
                        "X": 0.3854576349258423,
                        "Y": 0.12663060426712036
                    },
                    {
                        "Type": "rightEyeBrowLeft",
                        "X": 0.4395357072353363,
                        "Y": 0.11316251009702682
                    },
                    {
                        "Type": "rightEyeBrowRight",
                        "X": 0.4780283272266388,
                        "Y": 0.11761287599802017
                    },
                    {
                        "Type": "rightEyeBrowUp",
                        "X": 0.4570988416671753,
                        "Y": 0.10752978175878525
                    },
                    {
                        "Type": "leftEyeLeft",
                        "X": 0.3854368329048157,
                        "Y": 0.15515835583209991
                    },
                    {
                        "Type": "leftEyeRight",
                        "X": 0.4086611270904541,
                        "Y": 0.14801821112632751
                    },
                    {
                        "Type": "leftEyeUp",
                        "X": 0.39521339535713196,
                        "Y": 0.14672860503196716
                    },
                    {
                        "Type": "leftEyeDown",
                        "X": 0.39726462960243225,
                        "Y": 0.1534051150083542
                    },
                    {
                        "Type": "rightEyeLeft",
                        "X": 0.44614407420158386,
                        "Y": 0.13794782757759094
                    },
                    {
                        "Type": "rightEyeRight",
                        "X": 0.4693487584590912,
                        "Y": 0.13260352611541748
                    },
                    {
                        "Type": "rightEyeUp",
                        "X": 0.4574734568595886,
                        "Y": 0.12998120486736298
                    },
                    {
                        "Type": "rightEyeDown",
                        "X": 0.45857957005500793,
                        "Y": 0.13689330220222473
                    },
                    {
                        "Type": "noseLeft",
                        "X": 0.42472031712532043,
                        "Y": 0.181586354970932
                    },
                    {
                        "Type": "noseRight",
                        "X": 0.4475584924221039,
                        "Y": 0.17549407482147217
                    },
                    {
                        "Type": "mouthUp",
                        "X": 0.43959519267082214,
                        "Y": 0.19269587099552155
                    },
                    {
                        "Type": "mouthDown",
                        "X": 0.4444965720176697,
                        "Y": 0.21428647637367249
                    },
                    {
                        "Type": "leftPupil",
                        "X": 0.3962966203689575,
                        "Y": 0.15076768398284912
                    },
                    {
                        "Type": "rightPupil",
                        "X": 0.4583314061164856,
                        "Y": 0.13405437767505646
                    },
                    {
                        "Type": "upperJawlineLeft",
                        "X": 0.36254504323005676,
                        "Y": 0.18279413878917694
                    },
                    {
                        "Type": "midJawlineLeft",
                        "X": 0.3917747437953949,
                        "Y": 0.24711494147777557
                    },
                    {
                        "Type": "chinBottom",
                        "X": 0.4533618986606598,
                        "Y": 0.2542732357978821
                    },
                    {
                        "Type": "midJawlineRight",
                        "X": 0.5012000799179077,
                        "Y": 0.21817351877689362
                    },
                    {
                        "Type": "upperJawlineRight",
                        "X": 0.4977480173110962,
                        "Y": 0.1468488872051239
                    }
                ],
                "Pose": {
                    "Roll": -15.06100082397461,
                    "Yaw": 0.5720553398132324,
                    "Pitch": 23.734601974487305
                },
                "Quality": {
                    "Brightness": 90.5462417602539,
                    "Sharpness": 5.775668621063232
                },
                "Confidence": 99.9817886352539
            }
        }
    ],
    "FaceModelVersion": "6.0",
    "UnindexedFaces": []
}

aws rekognition start-stream-processor --name MyStreamProcessor

{
    "SessionId": "ce8b07da-3a35-458a-b989-6230dde2193d"
}

====================================