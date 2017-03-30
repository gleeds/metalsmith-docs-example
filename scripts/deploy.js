var ms = require('./metalsmith.js').ms;
var s3 = require('s3');
var AWS = require('aws-sdk');
var config = require('../config/aws.json');

ms
    .build(function(err){
        if(err) {
            return fatal(err.message);
        }
        else {
            var client = s3.createClient({
                s3Options: {
                    region: config.awsRegion
                }
            });
            
            var params = {
                localDir: __dirname + '/../build',
                deleteRemove: true,
                s3Params: {
                    Bucket:config.s3Bucket
                }
            };

            var uploader = client.uploadDir(params);
            uploader.on('error', function(err) {
                console.error("unable to sync:", err.stack);
            });
            uploader.on('progress', function() {
                console.log("progress", uploader.progressAmount, uploader.progressTotal);
            });
            uploader.on('end', function() {
                console.log("done uploading");

                var cloudfront = new AWS.CloudFront();
                var invalidationParams = {
                    DistributionId : config.cloudFrontDistribution,
                    InvalidationBatch: {
                        CallerReference: Date.now().toString(),
                        Paths: {
                            Quantity: 1,
                            Items: [
                                '/*'
                            ]
                        }
                    }
                };

                cloudfront.createInvalidation(invalidationParams,function(err,data){
                    if(err) {
                        console.log(err);
                    }
                    else {
                        console.log('CloudFront cache invalidation request sent');
                    }
                });
            });

        }
    });