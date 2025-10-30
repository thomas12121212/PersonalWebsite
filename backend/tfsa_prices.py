# tfsa_prices.py
import yfinance as yf
import json
from datetime import datetime

# 👇 Edit these tickers to match your TFSA holdings
HOLDINGS = {
    "VFV.TO": 25,   # Vanguard S&P 500 ETF
    "XIC.TO": 40,   # iShares Core TSX Capped Composite
    "BNS.TO": 20,   # Bank of Nova Scotia
    "VCN.TO": 15,   # Vanguard FTSE Canada All Cap
}

def get_live_prices(symbols):
    tickers = yf.Tickers(" ".join(symbols))
    data = {}
    for sym, t in tickers.tickers.items():
        try:
            price = t.info.get("regularMarketPrice")
            if price:
                data[sym] = price
        except Exception as e:
            print(f"Error fetching {sym}: {e}")
    return data

def main():
    prices = get_live_prices(list(HOLDINGS.keys()))
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

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

    output = {
        "timestamp": now,
        "holdings": results,
        "total_value": round(total_value, 2)
    }

    # print to console AND write to a JSON file (for your React site)
    print(json.dumps(output, indent=2))
    with open("tfsa_portfolio.json", "w") as f:
        json.dump(output, f, indent=2)

    print(f"\n✅ Updated tfsa_portfolio.json at {now}")

if __name__ == "__main__":
    main()
