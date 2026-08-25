export function MethodSequence({ steps }: { steps: string[] }) {
  return (
    <ol className="method-sequence">
      {steps.map((step, index) => (
        <li key={`${index}-${step}`}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{step}</strong>
        </li>
      ))}
    </ol>
  );
}
