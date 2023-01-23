
import snscrape.modules.twitter as sntwitter



     
    # return jsonify(vars(tweets))



def get_tweets( tw, limit):
    tweets=[]
    for tweet in sntwitter.TwitterSearchScraper(tw).get_items():
        if len(tweets)==limit:
            break
        else:
            tweets.append([tweet.date,tweet.user.username, tweet.content])
    return tweets




tweets = get_tweets('elonmusk ', 20)

print(tweets)