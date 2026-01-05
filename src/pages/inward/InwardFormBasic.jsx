import React, { useState, useEffect } from 'react';
import { inwardData } from '../../data/inwardData.js';
import { masterData } from '../../data/masterData.js';

const InwardFormBasic = ({ onSave }) => {
  const [form, setForm] = useState({
    inwardNo: `INW/${new Date().getFullYear()}/001`,
    inwardDate: new Date().toISOString().split('T')[0],
    receivedDate: new Date().toISOString().slice(0,16),
    from: '',
    mode: '',
    subject: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    const modes = masterData.getModes();
    const fromList = masterData.getFromTo();
    setForm(f => ({ ...f, _modes: modes, _fromList: fromList }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = { ...form, id: Date.now() };
    inwardData.unshift({
      inwardNo: entry.inwardNo,
      date: entry.inwardDate,
      from: entry.from || 'Unknown',
      mode: entry.mode || 'By Hand',
      subject: entry.subject || ''
    });
    if (onSave) onSave(entry);
    alert('Inward saved (placeholder)');
  };

  return (
    <form className="inward-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3>Basic Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Inward No</label>
            <input name="inwardNo" value={form.inwardNo} readOnly />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" name="inwardDate" value={form.inwardDate} onChange={handleChange} />
          </div>
          <div className="form-group full-width">
            <label>From</label>
            {form._fromList && form._fromList.length > 0 ? (
              <select name="from" value={form.from} onChange={handleChange}>
                <option value="">Select</option>
                {form._fromList.map((f, i) => (
                  <option key={i} value={f.name || f}>{f.name || f}</option>
                ))}
              </select>
            ) : (
              <input name="from" value={form.from} onChange={handleChange} />
            )}
          </div>
          <div className="form-group">
            <label>Mode</label>
            <select name="mode" value={form.mode} onChange={handleChange}>
              <option value="">Select</option>
              {(form._modes || []).map((m, i) => <option key={i} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="form-group full-width">
            <label>Subject</label>
            <input name="subject" value={form.subject} onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-primary">Save Inward</button>
      </div>
    </form>
  );
};

export default InwardFormBasic;
