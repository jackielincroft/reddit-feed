import flask
import requests
from flask import request, jsonify, render_template

app = flask.Flask(__name__, template_folder = 'templates')
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    response = requests.get('https://www.reddit.com/.json?limit=10')
    raw = response.json()
    print(raw)
    return render_template('frontpage.html')

@app.route('/frontpage', methods=['GET'])
def frontpage():
    response = requests.get('https://www.reddit.com/.json?limit=10')
    print(response.json()['data']['children'])
    return response.json()

@app.route('/subreddit', methods=['GET'])
def subreddit():
    print(request.form)
    response = requests.get('https://www.reddit.com/r/' + request.args['sub'] + '/.json?limit=10')
    articles = response.json()['data']['children']
    return render_template('subreddit.html', articles = articles)

app.run()