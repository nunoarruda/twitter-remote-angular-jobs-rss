const functions = require('firebase-functions');
const admin = require('firebase-admin');
const RSS = require('rss');

admin.initializeApp(functions.config().firebase);

exports.rss = functions.https.onRequest((request, response) => {
    const feed = new RSS({
        title: 'Twitter Remote Jobs RSS',
        feed_url: 'https://us-central1-twitter-jobs.cloudfunctions.net/rss',
        site_url: 'https://us-central1-twitter-jobs.cloudfunctions.net'
    });

    admin.database().ref('/').limitToLast(100).once('value', snapshot => {
        const tweets = [];

        snapshot.forEach(child => {
            tweets.push(child.val());
        });

        // by default, Firebase lists items in ascending order (oldest first)
        // we want descending order (newest first) so we reverse the array
        tweets.reverse();

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
