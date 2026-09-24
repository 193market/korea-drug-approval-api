"""Korea Drug Approval & Interaction API — quick start (Python, requests).
Set RAPIDAPI_KEY to the key shown on korea-drug-approval-interaction at rapidapi.com after subscribing to the free plan."""
import os
import requests

HOST = "korea-drug-approval-interaction.p.rapidapi.com"
KEY = os.environ["RAPIDAPI_KEY"]

def call(path: str):
    r = requests.get(f"https://{HOST}{path}",
                     headers={"X-RapidAPI-Key": KEY, "X-RapidAPI-Host": HOST}, timeout=30)
    r.raise_for_status()
    return r.json()

if __name__ == "__main__":
    # Is this combination on the MFDS contraindicated list?
    data = call("/v1/interactions/check?a=simvastatin&b=itraconazole")
    import json
    print(json.dumps(data, ensure_ascii=False, indent=2)[:2000])
