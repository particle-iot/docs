# Generating antenna JSON from a datasheet

Instructions for producing one antenna object (an entry for the `antennas` array in `antenna-data.json`) from an arbitrary antenna datasheet PDF. The `sku` field is not needed.

## Inputs

- A datasheet PDF.
- `antenna-data.json`, for the fixed `buckets` definitions and as a style reference. Read the `buckets` object first; do not redefine or duplicate it in the output.

## Steps

1. **Extract text.** Run `pdftotext -layout file.pdf out.txt` and read the whole result. Plots (VSWR, efficiency, gain) are usually images, so only tables and text are usable. Check for a raw-data table, which may appear as a very scrambled text block. If the numbers you need exist only in plots, do not guess from the plots. Omit those fields and say so in `notes`.
2. **Identify the electrical tables.** Typical columns are frequency range, VSWR, return loss, peak gain, average gain, and efficiency. Note the units and whether efficiency is one value or a max/avg pair.
3. **Map each source column or range to buckets** using the `frequencyRangeMHz` of each bucket in `buckets`:
   - A source range inside one bucket maps to that bucket.
   - A source range that spans several buckets (for example 1710-2690 MHz) is repeated in each bucket it covers. Say so in `notes`.
   - A range that extends beyond a bucket's edge (for example 3300-4900 into the 3300-4200 bucket) is assigned to the bucket containing most of it. Say so in `notes`.
   - Narrow points (for example GNSS 1575.42 MHz) go to the bucket containing them.
   - If a datasheet band fits no existing bucket, do not invent one silently. Tell the user and propose a new `buckets` entry.
4. **Set the service.** Use `"terrestrial"` for normal cellular. Use `"ntn"` for satellite (NR-NTN, e.g. n23/n255/n256) data, as a separate entry. Do not mix NTN figures into terrestrial entries.
5. **Merge source columns that land in the same (bucket, service).** Produce exactly one band entry per (bucket, service):
   - `peakGainDbi`: highest value.
   - `maxVswr`: highest (worst) value.
   - `maxReturnLossDb`: least negative (worst) value.
   - `avgGainDb`, `efficiencyPercent`, `efficiencyMaxPercent`, `efficiencyAvgPercent`: mean, rounded to 2 decimals.
   - `measuredRangesMHz`: list every source range merged, as `[low, high]` pairs. A single-frequency point is `[f, f]`.
6. **Fill the fields**, omitting any the datasheet does not provide:
   - `maxVswr`: number. Convert `2:1` or `≤ 2.5` to `2` or `2.5`. If given as a pair at the band edges (for example `1.6/1.8`), use the worst.
   - `maxReturnLossDb`: negative dB number. A limit such as `< -7` becomes `-7`.
   - Efficiency: if the datasheet gives one value, use `efficiencyPercent`. If it gives max/avg, use `efficiencyMaxPercent` and `efficiencyAvgPercent`. Do not mix these. Always in percent.
   - `avgGainDb`: use the published value. If it is not published but average efficiency is, derive it as `10*log10(avgEfficiency/100)`, and set `"avgGainDerivedFromEfficiency": true` on that entry.
   - If a datasheet gives a value as a fraction or in another unit (for example efficiency as 0.65, or gain in dBd), convert it to the unit above and say so in `notes`. If the unit cannot be converted safely, use a separate key named with the unit (for example `peakGainDbd`) rather than mixing units.
7. **Antenna-level fields:**
   - `name`: a readable name. Use the user's name if given, otherwise the datasheet product name.
   - `peakGain`: the highest peak gain in the datasheet's terrestrial data (dBi).
   - `avgGain`: the mean of the terrestrial band entries' `avgGainDb`, rounded to 2 decimals.
   - `source`: the manufacturer part number and revision (for example `Taoglas FXUB63.07.0150C`).
   - `notes` (only if needed): merge decisions, repeated ranges, derived values, test conditions (mounting substrate, cable), and anomalies.
   - Optional extra measurements the datasheet provides (for example CAT-M1 TRP/TIS tables) go in a clearly named extra array on the antenna (for example `otaTestsCatM1`). TIS values are negative dBm even if the text shows them unsigned.
8. **Sanity-check** before writing output:
   - Peak gain should be at least average gain in each entry. Average gain should be consistent with efficiency (about -3 dB at 50%, about -1.5 dB at 70%). If the datasheet is inconsistent (for example positive average gain with 55% efficiency), keep the published value and flag it in `notes`.
   - `peakGain` equals the highest `peakGainDbi`.
   - Every `bucket` value exists in `buckets`.

## Output shape

Return only this one object (valid JSON), without `sku`:

```json
{
  "name": "…",
  "peakGain": 0,
  "avgGain": 0,
  "source": "…",
  "notes": "… (optional)",
  "bands": [
    {
      "bucket": "low",
      "service": "terrestrial",
      "measuredRangesMHz": [[698, 960]],
      "peakGainDbi": 0,
      "avgGainDb": 0,
      "efficiencyPercent": 0,
      "maxVswr": 0,
      "maxReturnLossDb": 0
    }
  ]
}
```

Then list the decisions and any unusual points for the user, and offer to add the object to `antennas` in `antenna-data.json`.

## Bucket reference

The authoritative definitions are in `buckets` in `antenna-data.json`. `lteBands` and `nrBands` are band numbers, not EARFCN/NR-ARFCN channel numbers.
