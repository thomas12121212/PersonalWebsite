# backend/tfsa_prices.py
import yfinance as yf, json, os
from datetime import datetime

HOLDINGS = {"VFV.TO":25, "XIC.TO":40, "BNS.TO":20, "VCN.TO":15}

def get_live_prices(symbols):
    tickers = yf.Tickers(" ".join(symbols))
    out = {}
    for sym, t in tickers.tickers.items():
        try:
            p = t.fast_info.get("lastPrice") or t.info.get("regularMarketPrice")
            if p: out[sym] = float(p)
        except Exception: pass
    return out

def main():
    prices = get_live_prices(list(HOLDINGS.keys()))
    rows, total = [], 0.0
    for sym, sh in HOLDINGS.items():
        price = prices.get(sym)
        value = round((price or 0)*sh, 2)
        total += value
        rows.append({"symbol":sym, "shares":sh, "price":price, "value":value})
    data = {"timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "holdings": rows, "total_value": round(total, 2)}
    out_path = os.path.join("public","data")
    os.makedirs(out_path, exist_ok=True)
    with open(os.path.join(out_path, "tfsa_portfolio.json"), "w") as f:
        json.dump(data, f, indent=2)
    print("Wrote public/data/tfsa_portfolio.json")

if __name__ == "__main__":
    main()
