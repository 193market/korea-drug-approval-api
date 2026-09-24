// Korea Drug Approval & Interaction API — quick start (Node 18+, built-in fetch).
// Set RAPIDAPI_KEY to the key shown on korea-drug-approval-interaction at rapidapi.com after subscribing to the free plan.
const HOST = "korea-drug-approval-interaction.p.rapidapi.com";
const KEY = process.env.RAPIDAPI_KEY;

async function call(path) {
  const res = await fetch(`https://${HOST}${path}`, {
    headers: { "X-RapidAPI-Key": KEY, "X-RapidAPI-Host": HOST },
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
}

// Is this combination on the MFDS contraindicated list?
call("/v1/interactions/check?a=simvastatin&b=itraconazole").then((d) => console.log(JSON.stringify(d, null, 2).slice(0, 2000)));
