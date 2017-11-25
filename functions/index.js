const admin = require('firebase-admin');
const functions = require('firebase-functions');
const RSS = require('rss');

admin.initializeApp(functions.config().firebase);

exports.rss = functions.https.onRequest((request, response) => {
    const feed = new RSS({
        title: 'Twitter Remote Jobs RSS',
        feed_url: 'https://us-central1-twitter-jobs.cloudfunctions.net/rss',
        site_url: 'https://us-central1-twitter-jobs.cloudfunctions.net'
    });

    admin.firestore().collection('tweets').orderBy('created_at', 'desc').limit(100).get().then(snapshot => {
        const tweets = [];

        snapshot.forEach(doc => {
            tweets.push(doc.data());
        });

        // create feed items
        tweets.forEach(tweet => {
            feed.item({
                title: `${tweet.name} (@${tweet.screen_name})`,
                description: tweet.text,
                url: `https://twitter.com/${tweet.screen_name}/status/${tweet.id_str}`,
                guid: tweet.id_str,
                date: tweet.created_at
            });
        });

        // serve rss
        response.contentType('application/rss+xml');
        response.send(feed.xml());
    });
});
