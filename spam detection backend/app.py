import flask
from sklearn.externals import joblib
import pandas as pd
app = flask.Flask(__name__)


def init():
    global lr_model, vectorizer
    with open(
        "./lr.pkl", "rb"
    ) as handle:
        lr_model = joblib.load(handle)
    with open(
        "./vectorizer.pkl", "rb"
    ) as handle:
        vectorizer = joblib.load(handle)


def sendResponse(responseObj):
    response = flask.jsonify(responseObj)
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Methods", "GET")
    response.headers.add(
        "Access-Control-Allow-Headers",
        "accept,content-type,Origin,X-Requested-With,Content-Type,access_token,\
            Accept,Authorization,source",
    )
    response.headers.add("Access-Control-Allow-Credentials", True)
    return response

# API for prediction
@app.route("/predict", methods=["GET"])
def predict():
    phone_number = flask.request.args.get("phone_number")
    message = flask.request.args.get('message')
    raw_prediction = predict_message(message)
    return sendResponse(
        {"phone_number": phone_number, "message": message,
            "isSpam": str(raw_prediction)}
    )


def predict_message(message):
    test = vectorizer.transform(pd.Series(message))
    return lr_model.predict(test)[0]


if __name__ == "__main__":
    init()
    app.run()
