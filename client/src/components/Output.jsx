import "../styles/components.css";

const Output = ({ aiOutput, loading }) => {
  if (loading) return <div className="subtitle">generating magic...</div>;
  if (!aiOutput) return null;

  let summary = "";
  let notes = "";
  let mcqs = "";

  // detect type
  if (aiOutput.includes("Structured notes")) {
    const parts = aiOutput.split("2) Structured notes");

    summary = parts[0]
      ?.replace(/1\) Short summary:?/i, "")
      .trim();

    notes = parts[1]?.trim();
  }

  else if (aiOutput.toLowerCase().includes("question")) {
    mcqs = aiOutput;
  }

  return (
    <div className="output-container">

      {/* summary */}
      {summary && (
        <div className="output-card">
          <h1>Summary</h1>
          <pre className="output-text">{summary}</pre>
        </div>
      )}

      {/* notes */}
      {notes && (
        <div className="output-card">
          <h1>Notes</h1>
          <pre className="output-text">{notes}</pre>
        </div>
      )}

      {/* mcqs */}
      {mcqs && (
        <div className="output-card">
          <h1>mcqs</h1>
          <pre className="output-text">{mcqs}</pre>
        </div>
      )}

    </div>
  );
};

export default Output;