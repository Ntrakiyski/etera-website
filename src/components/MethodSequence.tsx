import type { AtelierContent } from "@/lib/cms";

export function MethodSequence({ steps }: { steps: AtelierContent["methodSteps"] }) {
  return (
    <ol className="method-sequence">
      {steps.map((step, index) => {
        const number = <span className="method-sequence__number">{String(index + 1).padStart(2, "0")}</span>;
        const label = <strong>{step.label}</strong>;

        return (
          <li key={`${index}-${step.label}`}>
            {step.description.trim() ? (
              <details>
                <summary>
                  {number}
                  {label}
                  <span aria-hidden="true" className="method-sequence__plus" />
                </summary>
                <p className="method-sequence__description">{step.description}</p>
              </details>
            ) : (
              <div className="method-sequence__label">{number}{label}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
