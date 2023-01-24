from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import datetime
import snscrape.modules.twitter as sntwitter
# import Twitter
from itertools import islice
import numpy as np
from flask_marshmallow import Marshmallow
from instagramy import InstagramUser,InstagramPost
from selenium import webdriver
from selenium.webdriver.chrome.service import Service

from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
#using selenium for web scrapping using a web driver

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://roots:PASSWORD@localhost:3306/flask"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)


class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    body = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(50), nullable=False)

    def __init__(self, title, body, author):
        self.title = title
        self.body = body
        self.author = author


class ArticleSchema(ma.Schema):
    class Meta:
        fields = ("id", "title", "body", "author")


article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)





@app.route("/get/<id>", methods=["GET"])
def get_article(id):
    article = Articles.query.get(id)
    return article_schema.jsonify(article)


@app.route("/get", methods=["GET"])
def get_articles():
    all_articles = Articles.query.all()
    result = articles_schema.dump(all_articles)
    return jsonify(result)


@app.route("/add", methods=["POST"])
def add_articles():
    title = request.json["title"]
    body = request.json["body"]
    author = request.json["author"]

    new_article = Articles(title, body, author)
    db.session.add(new_article)
    db.session.commit()

    return article_schema.jsonify(new_article)


@app.route("/edit/<id>", methods=["PUT"])
def edit_articles(id):

    title = request.json["title"]
    body = request.json["body"]
    author = request.json["author"]

    article = Articles.query.get(id)
    article.title = title
    article.body = body
    article.author = author

    db.session.commit()

    return article_schema.jsonify(article)


@app.route("/delete/<id>", methods=["DELETE"])
def delete_articles(id):
    article = Articles.query.get(id)
    db.session.delete(article)
    db.session.commit()

    return article_schema.jsonify(article)


@app.route("/twitter_search/<tw>",methods=["POST"])
def get_tweets( tw):
    tweets= list(islice(sntwitter.TwitterSearchScraper(tw).get_items(), 20))
    return jsonify({"tweets":tweets})

@app.route("/scrape/<handle>", methods=["POST"])
def insta(handle):
    user = InstagramUser(handle,sessionid=None,from_cache=True)
    user_privacy=user.is_private
    user_name=user.fullname
    user_followers=user.number_of_followers
    user_following=user.number_of_followings
    user_bio=user.biography
    user_website=user.website
    # i=0
    # location=[]
    # time_of_post=[]
    # array1=[]
    # array2=[]
    # array3=[]
    # array4=[]
    post_details=user.posts
    # poster=np.array([user.posts],dtype='object')
    # for i in range(0,11):
    #     if user_privacy is False:
    #          p=poster[0][i]
             
    #          if poster is not None:
                
    #                 post=p[6]
    #                 if post is not None:
    #                     posts=InstagramPost(post)
    #                     if posts.location is not None:
    #                         location=posts.location
    #                         array1.append(location[0])
    #                         array2.append(location[1])
    #                         array3.append(location[2])
    #                         array4.append(location[3])
    #                         time_of_post.append(posts.upload_time)
    return jsonify({"privacy":user_privacy,"bio":user_bio,"website":user_website,"followers":user_followers,"UserName":user_name,"Following":user_following,"Posts":post_details})

def get_ytdetails():
    option = Options()
    option.headless = False
    keyword = input()
    baseUrl = f"https://youtube.com/@{keyword}/about" 
#an input can be given for the keyword which we will search for
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))#install webdriver in the local system
    driver.implicitly_wait(20)
    driver.get(f"{baseUrl}")
    subscriber_count = driver.find_element("xpath",'//*[@id="subscriber-count"]').text
# description = driver.find_element("xpath",'//*[@id="description"]').text
    no_of_views = driver.find_element("xpath",'//*[@id="right-column"]/yt-formatted-string[3]').text
    Date_of_joining = driver.find_element("xpath",'//*[@id="right-column"]/yt-formatted-string[2]/span[2]').text
    return jsonify({"subscriber count":subscriber_count,
    "Number of Views":no_of_views,
    "Date of Joining":Date_of_joining})
 




if __name__ == "__main__":
    # app.run(host="192.168..1.8", port=19000)
    app.run(debug=True)



