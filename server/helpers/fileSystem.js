import AWS from 'aws-sdk';
import awsConfig from '../awsconfig.js';

AWS.config.update(awsConfig);
AWS.config.region = awsConfig.region;

let uploadImage = async ({ bucket, id, file }) => {
  console.info('Uploading file', awsConfig.bucketKey + bucket + '/' + id);

  let result = await new AWS.S3({
    region: awsConfig.region
  }).putObject({
    Bucket: awsConfig.bucketKey + bucket,
    Key: id,
    ContentType: 'text/plain',
    Body: file,
    ACL: 'public-read'
  }, (error, data) => {
    if (error) {
      console.info('Upload error', error);
      return false;
    } else {
      console.info('Upload success');
      return true;
    }
  });

  return result;
};

let downloadImage = async ({ bucket, id }) => {
  return await new Promise((resolve, reject) => {
    return new AWS.S3({
      region: awsConfig.region
    }).getObject({
      Bucket: awsConfig.bucketKey + bucket,
      Key: id,
    }, (error, result) => {
      if (error) {
        console.info('Cannot download image', awsConfig.bucketKey + bucket + '/' + id);
        return resolve(null);
      }
      return resolve(result.Body.toString('utf8'));
    });
  });
};

module.exports = {
  uploadImage: uploadImage,
  downloadImage: downloadImage
};
