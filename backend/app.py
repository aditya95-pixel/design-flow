from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from decouple import config

app = Flask(__name__)
CORS(app)  

GEMINI_API_KEY = config("GOOGLE_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

@app.route('/api/gemini', methods=['GET'])
def gemini():
    sys_prompt="Provide a response for the following in less than 50 words.You are Design App text content specialist"
    prompt = request.args.get('prompt')
    prompt=sys_prompt+"\n"+prompt
    print("Received prompt:", prompt)
    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400
    try:
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content(prompt)
        if hasattr(response, 'text'):
            generated_text = response.text  
        else:
            generated_text = str(response)  
        return jsonify({"response": generated_text})  
    except Exception as e:
        return jsonify({"error": f"Error generating content: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
