import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as RSS from "rss";

admin.initializeApp();
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

export const rss = functions.https.onRequest(async (request, response) => {
  const feed = new RSS({
    title: "Twitter Remote Angular Jobs RSS",
    feed_url: "https://us-central1-twitter-jobs.cloudfunctions.net/rss",
    site_url: "https://us-central1-twitter-jobs.cloudfunctions.net"
  });

  // get tweets from database
  let querySnapshot: FirebaseFirestore.QuerySnapshot;
  try {
    querySnapshot = await db
      .collection("tweets")
      .orderBy("created_at", "desc")
      .limit(100)
      .get();
  } catch (err) {
    console.error(err);
  }

  // loop thru each tweet
  querySnapshot.forEach(doc => {
    const tweet = doc.data();

    // create feed item
    feed.item({
      title: `${tweet.name} (@${tweet.screen_name})`,
      description: tweet.text,
      url: `https://twitter.com/${tweet.screen_name}/status/${tweet.id_str}`,
      guid: tweet.id_str,
      date: tweet.created_at.toDate()
    });
  });

  // serve rss
  response.contentType("application/rss+xml");
  response.send(feed.xml());
});
