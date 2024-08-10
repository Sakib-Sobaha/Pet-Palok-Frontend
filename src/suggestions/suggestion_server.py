from transformers import pipeline
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load pre-trained BERT model for masked language modeling
fill_mask = pipeline(task='fill-mask', model='bert-base-uncased')

@app.route('/suggest', methods=['GET'])
def suggest():
    query = request.args.get('query', '')
    suggestions = fill_mask(f"{query} is a [MASK]")
    result = [s['sequence'].replace('[MASK]', '').strip() for s in suggestions]
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5000)
