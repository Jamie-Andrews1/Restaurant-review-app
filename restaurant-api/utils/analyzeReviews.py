from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import json
import sys

analyzer = SentimentIntensityAnalyzer()

def analyze_reviews(reviews):
    results = []
    for r in reviews:
        if r and isinstance(r, str) and r.strip():
            score = analyzer.polarity_scores(r)["compound"]
            label = "POSITIVE" if score > 0.05 else "NEGATIVE" if score < -0.05 else "NEUTRAL"
            results.append({
                "text": r,
                "label": label,
                "score": abs(score)
            })
        else:
            results.append({
                "text": r,
                "label": "NEUTRAL",
                "score": 0.0
            })
    return json.dumps(results)

if __name__ == "__main__":
    # Read JSON from file
    input_file = sys.argv[1] if len(sys.argv) > 1 else None
    input_reviews = []
    if input_file:
        try:
            with open(input_file, 'r') as f:
                input_reviews = json.load(f)
        except (json.JSONDecodeError, FileNotFoundError) as e:
            print(f"Error reading input file: {e}", file=sys.stderr)
            sys.exit(1)
    
    print(analyze_reviews(input_reviews))