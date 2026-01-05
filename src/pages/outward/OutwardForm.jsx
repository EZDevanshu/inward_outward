import React, { useState, useEffect } from 'react';
import { createInwardNo } from '../../data/inwardData.js';
import { outwardData } from '../../data/outwardData.js';
import { masterData } from '../../data/masterData.js';

const OutwardForm = ({ onSave }) => {
  const [form, setForm] = useState({
    outwardNo: `OUT/${new Date().getFullYear()}/001`,
    outwardDate: new Date().toISOString().split('T')[0],
    to: '',
    mode: '',
    courier: '',
    trackingNo: '',
    subject: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    const modes = masterData.getModes();
    const couriers = masterData.getCouriers();
    setForm(f => ({ ...f, _modes: modes, _couriers: couriers }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = { ...form, id: Date.now() };
    outwardData.unshift(entry);
    if (onSave) onSave(entry);
    alert('Outward saved (placeholder)');
  };

  return (
    <form className="inward-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3>Outward Basic</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Outward No</label>
            <input name="outwardNo" value={form.outwardNo} readOnly />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" name="outwardDate" value={form.outwardDate} onChange={handleChange} />
          </div>
          <div className="form-group full-width">
            <label>To</label>
            <input name="to" value={form.to} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Mode</label>
            <select name="mode" value={form.mode} onChange={handleChange}>
              <option value="">Select</option>
              {(form._modes || []).map((m, i) => <option key={i} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Courier</label>
            <select name="courier" value={form.courier} onChange={handleChange}>
              <option value="">Select</option>
              {(form._couriers || []).map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Tracking No</label>
            <input name="trackingNo" value={form.trackingNo} onChange={handleChange} />
          </div>
          <div className="form-group full-width">
            <label>Subject</label>
            <input name="subject" value={form.subject} onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-primary">Save Outward</button>
      </div>
    </form>
  );
};

export default OutwardForm;
