import type { BusinessResult } from "@/lib/api";

interface ResultCardProps {
  result: BusinessResult;
  rank: number;
}

function renderSnippet(snippet: string) {
  // Convert **bold** markers from the API into styled spans
  const parts = snippet.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="bg-yellow-200 text-yellow-900 font-semibold px-0.5 rounded">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function ScoreBadge({ score }: { score: number }) {
  let color = "bg-red-100 text-red-700";
  if (score >= 4) color = "bg-green-100 text-green-700";
  else if (score >= 3) color = "bg-yellow-100 text-yellow-700";
  else if (score >= 2) color = "bg-orange-100 text-orange-700";

  return (
    <span className={`text-2xl font-bold px-3 py-1 rounded-lg ${color}`}>
      {score.toFixed(1)}
    </span>
  );
}

export default function ResultCard({ result, rank }: ResultCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm
                    hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {/* Rank badge */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-600 text-white
                        flex items-center justify-center text-sm font-bold">
          {rank}
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-gray-900 truncate">
                {result.name}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">{result.address}</p>
            </div>

            {/* Match score - big and highlighted */}
            <div className="flex-shrink-0 text-right">
              <ScoreBadge score={result.match_score} />
              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">
                Match Score
              </p>
            </div>
          </div>

          {/* Metadata row */}
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            <span>Note globale : {result.global_rating.toFixed(1)}/5</span>
            <span className="text-gray-300">|</span>
            <span>{result.frequency} mention{result.frequency > 1 ? "s" : ""}</span>
          </div>

          {/* Review snippet */}
          {result.best_snippet && (
            <blockquote className="mt-3 text-sm text-gray-600 italic border-l-2
                                   border-brand-500 pl-3 leading-relaxed">
              &ldquo;{renderSnippet(result.best_snippet)}&rdquo;
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}
