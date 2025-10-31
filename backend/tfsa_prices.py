# backend/tfsa_prices.py
# cd backend
# source ../.venv/bin/activate
# python tfsa_prices.py
from pathlib import Path
import yfinance as yf, json, os
from datetime import datetime

HOLDINGS = {"BNS":185, "CM":30, "TSLA":50, "GOOG":20}

def get_prices(symbols):
    tickers = yf.Tickers(" ".join(symbols))
    out = {}
    for sym, t in tickers.tickers.items():
        try:
            out[sym] = float(t.fast_info.get("lastPrice") or t.info.get("regularMarketPrice"))
        except Exception:
            pass
    return out

def main():
    # repo root = parent of /backend
    ROOT = Path(__file__).resolve().parents[1]
    out_dir = ROOT / "public" / "data"
    out_dir.mkdir(parents=True, exist_ok=True)
    out_file = out_dir / "tfsa_portfolio.json"

    prices = get_prices(HOLDINGS.keys())
    rows, total = [], 0.0
    for sym, sh in HOLDINGS.items():
        p = prices.get(sym)
        v = round((p or 0) * sh, 2)
        total += v
        rows.append({"symbol": sym, "shares": sh, "price": p, "value": v})

    data = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "holdings": rows,
        "total_value": round(total, 2),
    }

    out_file.write_text(json.dumps(data, indent=2))
    print(f"✅ Wrote {out_file}")

if __name__ == "__main__":
    main()
