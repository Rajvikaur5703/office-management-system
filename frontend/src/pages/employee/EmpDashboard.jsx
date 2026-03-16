import '../../assets/styles/employee/dashboard.css';

function EmpDashboard()
{
    
    const stats = [
    { title: 'Total Tasks', value: '156', icon: 'fa-users', color: '#3b82f6', change: '+12%' },
    { title: 'Total Attendence', value: '234', icon: 'fa-check-circle', color: '#10b981', change: '+23%' },
    { title: 'Active Projects', value: '18', icon: 'fa-briefcase', color: '#f59e0b', change: '+5%' },
    { title: 'Meetings', value: '127', icon: 'fa-clock', color: '#8b5cf6', change: '+8%' }
  ];
    return(
        <div className='home'>
            <div className='top-section'>
                <div className="search-bar">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Search employees, tasks, documents..." />
                </div>
                
                <div className='filter'>
                    Last 30 days
                </div>
            </div>

            <div className="stats-grid">
                    {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                    <div className="stat-icon" style={{ background: `${stat.color}15` }}>
                        <i className={`fas ${stat.icon}`} style={{ color: stat.color }}></i>
                    </div>
                    <div className="stat-content">
                        <div>
                            <p className="stat-label">{stat.title}</p>
                            <h3 className="stat-value">{stat.value}</h3>
                        </div>
                        <span className="stat-change positive">{stat.change}</span>
                    </div>
                </div>
                ))}
            </div>

        </div>
    ); 
}

export default EmpDashboard;