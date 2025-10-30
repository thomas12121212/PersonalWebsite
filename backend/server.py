# backend/server.py
from flask import Flask, jsonify
from tfsa_prices import get_live_prices, HOLDINGS
import datetime

app = Flask(__name__)

@app.route("/api/tfsa")
def get_tfsa_data():
    """Return your latest TFSA portfolio as JSON."""
    prices = get_live_prices(list(HOLDINGS.keys()))
    results = []
    total_value = 0

    for sym, shares in HOLDINGS.items():
        price = prices.get(sym)
        value = shares * price if price else 0
        total_value += value
        results.append({
            "symbol": sym,
            "shares": shares,
            "price": price,
            "value": round(value, 2)
        })

    return jsonify({
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "holdings": results,
        "total_value": round(total_value, 2)
    })

if __name__ == "__main__":
    app.run(debug=True, port=5001)
