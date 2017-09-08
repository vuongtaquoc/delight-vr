'use strict';

const aws = require('aws-sdk');

const credential = {
	accessKeyId: 'AKIAIXV7RDFYXUVGSCNA',
	secretAccessKey: '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',
	region: 'ap-southeast-1',
};
const EXPIRES = 300; // ~ 5 min

aws.config.update(credential);
let s3 = new aws.S3();
let self = module.exports = {};

self.redirectToPreSignedUrl = function(req, res, next) {
	let bucket = 'syminar.livestream';
	let key = '45902802/2ca15b9d-c497-4d51-ad46-1e31368be3fa/archive.mp4';

	s3.getSignedUrl('getObject', {
		Bucket: bucket,
		Key: key,
		Expires: EXPIRES,
	}, function(error, preSignedUrl) {
		if (error) {
			return next({
				code: 400,
				error: error,
			});
		}

		res.redirect(preSignedUrl);
	});
};
