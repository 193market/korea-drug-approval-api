# Korea Drug Approval & Interaction API

Every drug approved in Korea plus the MFDS contraindication (DUR) lists, as English JSON.

**Try it (free tier, no card):** [https://rapidapi.com/193market/api/korea-drug-approval-interaction](https://rapidapi.com/193market/api/korea-drug-approval-interaction) · also on [api.market](https://api.market/store/193market/korea-drug-approval-interaction)

Every drug product approved in Korea (about 43,000, with English product, company and ingredient names) and the MFDS DUR contraindication lists: contraindicated combinations (about 800,000 product pairs), pregnancy and age contraindications, elderly, dose and duration cautions, therapeutic duplication and do-not-split notices. MFDS data as English JSON.

## Who uses it

Pharma regulatory and market-access teams, medication-safety software, generic-entry analysts and pharmacy apps serving Korea.

## Quick start

Subscribe to the free BASIC plan on RapidAPI, copy your `X-RapidAPI-Key`, then:

```bash
curl "https://korea-drug-approval-interaction.p.rapidapi.com/v1/interactions/check?a=simvastatin&b=itraconazole" \
  -H "X-RapidAPI-Key: $RAPIDAPI_KEY" \
  -H "X-RapidAPI-Host: korea-drug-approval-interaction.p.rapidapi.com"
```

Python and Node examples are in [`examples/`](examples/). Both read the key from the `RAPIDAPI_KEY` environment variable.

Other calls worth trying:
- Search approved products by name, company or ingredient: `GET /v1/drugs/search?q=metformin&per_page=3`
- Products this one must not be combined with: `GET /v1/drugs/200200173/interactions?per_page=3`

## Example response

`GET /v1/interactions/check?a=simvastatin&b=itraconazole` — Is this combination on the MFDS contraindicated list?:

```json
{
  "a": {
    "input": "simvastatin",
    "kind": "ingredient",
    "ingredients": [
      "simvastatin"
    ]
  },
  "b": {
    "input": "itraconazole",
    "kind": "ingredient",
    "ingredients": [
      "itraconazole"
    ]
  },
  "contraindicated_combination": true,
  "listed": true,
  "verdict": "On the MFDS contraindicated-combination (병용금기) list",
  "ingredient_pairs": [
    {
      "ingredient": "Itraconazole",
      "ingredient_ko": "이트라코나졸",
      "with": "Simvastatin",
      "with_ko": "심바스타틴",
      "reason_ko": "횡문근융해증",
      "remark_ko": null,
      "notified_on": "2009-03-03",
      "example_products": {
        "a": "코니트라캡슐(이트라코나졸)(수출용)",
        "b": "심바로드정20밀리그램(심바스타틴)"
      }
    }
  ],
  "product_pair_listed": false,
  "as_of": "2026-09-16",
  "notice": "Regulatory reference data as published by the MFDS. Informational only; not clinical advice and not a substitute for the product label or a pharmacist.",
  "attribution": {
    "source": "Ministry of Food and Drug Safety of Korea (식품의약품안전처) — drug product approvals; DUR (Drug Utilization Review) notices",
    "via": "Public Data Portal of Korea (data.go.kr) datasets 15095677 and 15059486",
    "license": "No usage restrictions (이용허락범위 제한 없음)",
    "changes": "Field names translated to English keys, dates normalised to ISO 8601, class codes split, approval and DUR records linked by MFDS item number.",
    "notice": "Regulatory reference data as published by the MFDS. Informational only; not clinical advice and not a substitute for the product label or a pharmacist."
  }
}
```

## Endpoints

| Method | Path | What it does | Parameters (* required) |
|---|---|---|---|
| GET | `/health` | Health check |  |
| GET | `/v1/drugs/search` | Search approved drugs by name, company or ingredient | `q`, `ingredient`, `company`, `status`, `prescription`, `approved_from`, `approved_to`, `page`, `per_page` |
| GET | `/v1/drugs/{item_seq}` | One approved drug with its DUR summary | `item_seq`* |
| GET | `/v1/drugs/{item_seq}/interactions` | Products this drug must not be combined with (MFDS 병용금기) | `item_seq`*, `page`, `per_page` |
| GET | `/v1/interactions/check` | Is this combination on the MFDS contraindicated list? (two ingredients or two item numbers) | `a`*, `b`* |
| GET | `/v1/ingredients/{name}/drugs` | How many, and which, Korean approvals contain this ingredient (generic-entry check) | `name`*, `status`, `page`, `per_page` |
| GET | `/v1/companies/search` | Companies holding Korean drug approvals | `q`, `business_registration_number`, `page`, `per_page` |
| GET | `/v1/dur/{type_key}` | One MFDS DUR list (pregnancy, age, elderly, dose, duration, duplication, do-not-split) | `type_key`*, `ingredient`, `page`, `per_page` |
| GET | `/v1/codes` | DUR types, status values and field notes |  |

The full OpenAPI 3 specification is in [`openapi.json`](openapi.json).

## Plans

| Plan | Price | Included per month |
|---|---|---|
| BASIC | free | a small monthly quota for evaluation |
| PRO / ULTRA / MEGA | from $49 / month | 1,000+ requests, per-request overage, higher rate limits |

Current prices are always on the [RapidAPI pricing page](https://rapidapi.com/193market/api/korea-drug-approval-interaction/pricing). Error responses (4xx/5xx) are not charged on api.market.

## Data source and licence

Ministry of Food and Drug Safety of Korea, product approvals (data.go.kr 15095677) and DUR item rules (15059486), no usage restriction. Product- and ingredient-level rules only; no patient data.

Every response carries an `attribution` object naming the source and the changes made (translation, normalisation, filtering, aggregation). This API is an independent product and is not affiliated with or endorsed by any government agency or regulator.

## Support

Questions, missing fields, or a use case the current plans do not fit: open an issue in this repository or use the Discussions tab on the RapidAPI listing.
