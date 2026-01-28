interface ScoreDisplayProps {
  score: number;
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 border-2 border-slate-700">
      <h3 className="text-white font-bold text-sm mb-2 text-center">SCORE</h3>
      <div className="text-3xl font-bold text-blue-400 text-center tabular-nums">
        {score.toLocaleString()}
      </div>
    </div>
  );
}
