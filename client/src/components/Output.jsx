import '../styles/components.css';

const Output = ({ aiOutput, loading }) => {
  if (loading) return <div className="output-loading"></div>;
  if (!aiOutput) return null;

  // split summary & notes
  const [summaryRaw, notesRaw] = aiOutput.split('2) Structured notes');

  return (
    <div className="output-container">
      {/* summary card */}
      <div className="output-card">
        <h1>AI Summary</h1>
        <pre className='output-text'>{summaryRaw?.replace(/^1\) Short summary:/, '').trim()}</pre>
      </div>

      {/* notes card */}
      {notesRaw && (
        <div className="output-card">
          <h1>AI Notes</h1>
          <pre className='output-text'>{notesRaw.trim()}</pre>
        </div>
      )}
    </div>
  );
};

export default Output;