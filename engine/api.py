import flask
from flask import request, jsonify
from flask_cors import CORS
from infrastructure.chat import response_sentence

app = flask.Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def ask_question():
    query_parameters = request.args
    sentence = query_parameters.get('sentence')
    response = response_sentence(sentence)
    return jsonify({'answer': response})


app.run(host='0.0.0.0', debug=False)
