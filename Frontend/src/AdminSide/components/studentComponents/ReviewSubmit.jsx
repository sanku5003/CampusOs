const ReviewSubmit = ({ sections, confirmed, submitting, submitError, onConfirm, onEdit, onBack, onSubmit }) => (
  <div className="review-panel">
    <h4 className="text-white font-bold mt-1">Review &amp; Submit</h4>
    <p className="text-underheading">Confirm the admission details before submitting the application.</p>
    {sections.map((section) => (
      <section className="review-card" key={section.title}>
        <div className="review-card-heading"><h5><i className={section.icon}></i>{section.title}</h5><button type="button" onClick={() => onEdit(section.step)}>Edit</button></div>
        <div className="review-grid">{section.values.map(([label, value]) => <div key={label}><p>{label}</p><strong>{value || "Not provided"}</strong></div>)}</div>
      </section>
    ))}
    <label className="review-confirm"><input type="checkbox" checked={confirmed} onChange={onConfirm} /> I confirm that all information provided is accurate and complete.</label>
    {submitError && <p className="form-submit-error">{submitError}</p>}
    <div className="w-full flex justify-between items-center mt-5"><button type="button" className="sec-btn text-sm" onClick={onBack}><i className="ri-arrow-left-wide-line"></i> Back</button><button type="button" className="primary-btn" disabled={submitting} onClick={onSubmit}>{submitting ? "Submitting..." : "Submit Admission"}</button></div>
  </div>
);

export default ReviewSubmit;