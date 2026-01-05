import React, { useState, useEffect } from 'react';
import { saveNewInward, createInwardNo } from '../../data/inwardData.js';
import { masterData } from '../../data/masterData.js';

const InwardForm = () => {
  const [formData, setFormData] = useState({
    inwardNo: '',
    inwardDate: new Date().toISOString().split('T')[0],
    receivedDate: new Date().toISOString().slice(0, 16),
    subject: '',
    subjectShort: '',
    description: '',
    letterFromName: '',
    letterFromAddress: '',
    fromContactDetails: '',
    toOffice: '',
    department: '',
    mode: '',
    courierCompany: '',
    receiptNo: '',
    trackingID: '',
    toPerson: '',
    copyTo: '',
    compilations: '',
    fileName: '',
    remarks: '',
    financialYear: new Date().getFullYear()
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-generate InwardNo on mount
  useEffect(() => {
    setFormData(prev => ({ 
      ...prev, 
      inwardNo: createInwardNo() 
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error on type
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, fileName: file ? file.name : '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.subject.trim()) newErrors.subject = 'Subject required';
    if (!formData.toOffice) newErrors.toOffice = 'To Office required';
    if (!formData.inwardDate) newErrors.inwardDate = 'Date required';
    
    const received = new Date(formData.receivedDate);
    if (received > new Date()) newErrors.receivedDate = 'Cannot be future date';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setSuccessMsg('');
    
    try {
      // 🔥 BACKEND READY - DASHBOARD AUTO UPDATE
      await saveNewInward(formData);
      setSuccessMsg(`✅ Saved: ${formData.inwardNo}`);
      
      // Reset form (keep sequence)
      setFormData({
        inwardNo: createInwardNo(),
        inwardDate: new Date().toISOString().split('T')[0],
        receivedDate: new Date().toISOString().slice(0, 16),
        subject: '',
        subjectShort: '',
        description: '',
        letterFromName: '',
        letterFromAddress: '',
        fromContactDetails: '',
        toOffice: '',
        department: '',
        mode: '',
        courierCompany: '',
        receiptNo: '',
        trackingID: '',
        toPerson: '',
        copyTo: '',
        compilations: '',
        fileName: '',
        remarks: '',
        financialYear: new Date().getFullYear()
      });
      
    } catch (error) {
      setErrors({ submit: 'Save failed. Try again.' });
    } finally {
      setLoading(false);
    }
    
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="inward-form">
      {/* Success Message */}
      {successMsg && <div className="success-msg">{successMsg}</div>}
      
      {/* Basic Info */}
      <div className="form-section">
        <h3>📋 Basic Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Inward No.</label>
            <input name="inwardNo" value={formData.inwardNo} readOnly className="readonly" />
          </div>
          
          <div className="form-group">
            <label>Inward Date <span className="required">*</span></label>
            <input 
              type="date" 
              name="inwardDate" 
              value={formData.inwardDate} 
              onChange={handleChange}
              className={errors.inwardDate ? 'error-input' : ''}
            />
            {errors.inwardDate && <span className="error">{errors.inwardDate}</span>}
          </div>
          
          <div className="form-group">
            <label>Received Date/Time</label>
            <input 
              type="datetime-local" 
              name="receivedDate" 
              value={formData.receivedDate} 
              onChange={handleChange}
              className={errors.receivedDate ? 'error-input' : ''}
            />
            {errors.receivedDate && <span className="error">{errors.receivedDate}</span>}
          </div>
          
          <div className="form-group full-width">
            <label>Subject <span className="required">*</span></label>
            <input 
              name="subject" 
              value={formData.subject} 
              onChange={handleChange}
              className={errors.subject ? 'error-input' : ''}
            />
            {errors.subject && <span className="error">{errors.subject}</span>}
          </div>
          
          <div className="form-group full-width">
            <label>Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange}
              rows="3"
            />
          </div>
        </div>
      </div>

      {/* Sender Info */}
      <div className="form-section">
        <h3>📧 Sender Details</h3>
        <div className="form-grid">
          <div className="form-group full-width">
            <label>Letter From</label>
            <input name="letterFromName" value={formData.letterFromName} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label>Address</label>
            <textarea 
              name="letterFromAddress" 
              value={formData.letterFromAddress} 
              onChange={handleChange}
              rows="2"
            />
          </div>
          
          <div className="form-group">
            <label>Contact</label>
            <input name="fromContactDetails" value={formData.fromContactDetails} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* Delivery Details */}
      <div className="form-section">
        <h3>🚚 Delivery Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Mode</label>
            <select name="mode" value={formData.mode} onChange={handleChange}>
              <option value="">Select Mode</option>
              <option value="Courier">Courier</option>
              <option value="Hand">By Hand</option>
              <option value="Email">Email</option>
              <option value="Post">Post</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Receipt No</label>
            <input name="receiptNo" value={formData.receiptNo} onChange={handleChange} />
          </div>
          
          {formData.mode === 'Courier' && (
            <>
              <div className="form-group">
                <label>Courier Company</label>
                <select name="courierCompany" value={formData.courierCompany} onChange={handleChange}>
                  <option value="">Select</option>
                  {masterData.couriers?.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Tracking ID</label>
                <input name="trackingID" value={formData.trackingID} onChange={handleChange} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Internal Routing */}
      <div className="form-section">
        <h3>🏢 Internal Routing</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>To Office <span className="required">*</span></label>
            <select 
              name="toOffice" 
              value={formData.toOffice} 
              onChange={handleChange}
              className={errors.toOffice ? 'error-input' : ''}
            >
              <option value="">Select Office</option>
              {masterData.offices?.map(office => (
                <option key={office.id} value={office.name}>{office.name}</option>
              ))}
            </select>
            {errors.toOffice && <span className="error">{errors.toOffice}</span>}
          </div>
          
          <div className="form-group">
            <label>Department</label>
            <select name="department" value={formData.department} onChange={handleChange}>
              <option value="">Select</option>
              {masterData.departments?.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>To Person</label>
            <input name="toPerson" value={formData.toPerson} onChange={handleChange} />
          </div>
          
          <div className="form-group full-width">
            <label>Copy To</label>
            <input name="copyTo" value={formData.copyTo} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* File & Remarks */}
      <div className="form-section">
        <h3>📎 Attachments & Remarks</h3>
        <div className="form-grid">
          <div className="form-group full-width">
            <label>Upload File</label>
            <input type="file" onChange={handleFile} accept=".pdf,.jpg,.png" />
            {formData.fileName && (
              <div className="file-preview">📄 {formData.fileName}</div>
            )}
          </div>
          
          <div className="form-group full-width">
            <label>Remarks</label>
            <textarea 
              name="remarks" 
              value={formData.remarks} 
              onChange={handleChange}
              rows="4"
              placeholder="Additional notes..."
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="form-actions">
        <button 
          type="button" 
          onClick={() => window.location.reload()}
          className="btn-secondary"
        >
          🔄 Reset
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="btn-primary"
        >
          {loading ? '⏳ Saving...' : '💾 Save Inward Entry'}
        </button>
      </div>

      {errors.submit && <div className="error full">{errors.submit}</div>}
    </form>
  );
};

export default InwardForm;
