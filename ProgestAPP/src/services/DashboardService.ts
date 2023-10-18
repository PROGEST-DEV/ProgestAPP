import API from 'apiConfig';
import DashboardItem from 'interfaces/DashboardItem';

const DashboardService = {
    getAll: () => new Promise<DashboardItem[]>(
        (resolve, reject)=>{
            API.get('Dashboard')
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        }
    ),
}

export default DashboardService;