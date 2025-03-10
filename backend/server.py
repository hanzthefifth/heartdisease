from flask import Flask, send_from_directory, jsonify

#create flask app, specify folder for html files
app = Flask(__name__, static_folder='public', static_url_path='/')

# Route to serve the React app's index.html file.
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

# Example API endpoint that the React app can call for data.
@app.route('/api/data')
def get_data():
    data = {
        "message": "Hello from the Flask API!",
        "user": "John Doe",
        "riskFactor": 42
    }
    return jsonify(data) #send back to react as JSON

# Catch-all route to support client-side routing with React Router.
# Any URL not handled by the above routes will return the index.html file,
# allowing React Router to handle the routing on the client side.
@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    #run flask in debug mode
    app.run(debug=True)