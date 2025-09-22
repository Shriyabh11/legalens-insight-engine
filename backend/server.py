
import os
import json
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

app = Flask(__name__)

# Configure the Gemini API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@app.route('/api/generate', methods=['POST'])
def generate_text():
    """
    This endpoint receives a prompt from the user, sends it to the Gemini API,
    and returns the generated text. Used for the chatbot.
    """
    if not request.json or 'prompt' not in request.json:
        return jsonify({'error': 'Missing prompt in request'}), 400

    prompt = request.json['prompt']

    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        return jsonify({'generated_text': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analyze', methods=['POST'])
def analyze_document():
    """
    This endpoint receives document text, analyzes it using Gemini,
    and returns a structured JSON with the analysis.
    """
    if not request.json or 'document_text' not in request.json:
        return jsonify({'error': 'Missing document_text in request'}), 400

    document_text = request.json['document_text']

    prompt = f'''
Analyze the following legal document. Provide a response in JSON format with the following structure:
{{
  "riskScore": <a number between 0 and 100 representing the risk level>,
  "piiDetected": <a number representing the count of personally identifiable information instances found>,
  "clauses": <a number representing the total count of clauses identified>,
  "language": "<The language of the document (e.g., 'English')>",
  "issues": ["<A list of strings, where each string is a potential issue or risk found in the document>"],
  "summary": "<A brief summary of the document's purpose and key terms>"
}}

Please make sure the output is a valid JSON object.

Document content:
```
{document_text}
```
'''

    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        
        # Clean the response to get valid JSON
        cleaned_text = response.text.strip().replace('`json', '').replace('`', '')
        analysis_result = json.loads(cleaned_text)
        
        return jsonify(analysis_result)
    except Exception as e:
        return jsonify({'error': f"Failed to parse Gemini response: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
