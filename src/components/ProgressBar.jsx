export default function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-200 h-2 rounded-full">
      <div
        className="bg-blue-600 h-full rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
