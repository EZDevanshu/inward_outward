// home.jsx
import "../style/home.css";
import { rows } from "../data";

function Home() {
  return (
    <div className="dashboard-page">
      <div className="dash-summary">
        <div className="today-inward summary-card">{/* changed: summary-card class */}
          <p>Today&apos;s Inward</p>
          <h2>24</h2>
          <span>+5% vs yesterday</span>
        </div>
        <div className="today-outward summary-card">{/* changed */}
          <p>Today&apos;s Outward</p>
          <h2>18</h2>
          <span>-2% vs yesterday</span>
        </div>
        <div className="in-process summary-card">{/* changed */}
          <p>In-Process</p>
          <h2>07</h2>
          <span>Requires attention</span>
        </div>
        <div className="monthly-total summary-card">{/* changed */}
          <p>Monthly Total</p>
          <h2>412</h2>
          <span>On track</span>
        </div>
      </div>

      <div className="dash-filters">
        <input
          type="text"
          placeholder="Search by No / Subject / From"
        />
        <select>
          <option>All Type</option>
          <option>Inward</option>
          <option>Outward</option>
        </select>
        <select>
          <option>All Departments</option>
          <option>HR</option>
          <option>Finance</option>
        </select>
        <input type="date" />
        <input type="date" />
      </div>

      <div className="dash-main">
        {/* left recent entry table  */}
        <div className="recent-entries card">{/* changed: card class */}
          <h3>Recent Entries</h3>
          <table className="entries-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Date</th>
                <th>Parsel No.</th>
                <th>Type</th>
                <th>From</th>
                <th>To/Department</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
                {rows.map((item)=>(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.date}</td>
                        <td>{item.parcel}</td>
                        <td>{item.type}</td>
                        <td>{item.from}</td>
                        <td>{item.to}</td>
                        <td>{item.status}</td>
                    </tr>
                ))
                }
            </tbody>
          </table>
        </div>

        <div className="dash-side">
          {/* right side cards */}
          <div className="side-card card">{/* changed: card class */}
            <h3>Activity Chart</h3>
            <p>Chart Location</p>
          </div>
          <div className="side-card card">{/* changed */}
            <h3>Reminders</h3>
            <ul>
              <li>Dispatch legal doc @442</li>
              <li>Follow up with Office B</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
