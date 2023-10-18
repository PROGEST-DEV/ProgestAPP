import API from 'apiConfig';
import ReimbursementItem from 'interfaces/ReimbursementItem';

const ReimbursementService = {
    getAll: (searchFields?: string[], searchTerm?: string) => new Promise<ReimbursementItem[]>(
        (resolve, reject)=>{
            const searchParams = new URLSearchParams();
            if (searchFields && searchTerm) {
                searchFields.forEach(field => {
                    searchParams.append('searchFields', field);
                });
                searchParams.append('searchTerm', searchTerm);
            }    
            const url = `Reimbursements?${searchParams.toString()}`;
    
            API.get(url)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        }
    ),
    get: (key: string) => new Promise<ReimbursementItem>(
        (resolve, reject) => {
          API.get(`Reimbursements/${key}`)
            .then(
              res => resolve(res.data)
            )
            .catch(
              err => reject(err)
            );
        }
    ),
    create: (newReimbursement: ReimbursementItem) => new Promise<any>(
        (resolve, reject) => {
            API.post('Reimbursements', newReimbursement)
            .then(
                res => resolve(res.data)
            )
            .catch(
                err => reject(err)
            );
        }
    ),
    edit: (key: string, editedReimbursement: ReimbursementItem) => new Promise<any>(
        (resolve, reject) => {
            API.put(`Reimbursements/${key}`, editedReimbursement)
            .then(
                res => resolve(res.data)
            )
            .catch(
                err => reject(err)
            );
        }
    ),
    delete: (key: string) => new Promise<void>(
        (resolve, reject) => {
            API.delete(`Reimbursements/${key}`)
                .then(
                    () => resolve()
                )
                .catch(
                    err => reject(err)
                );
        }
    )
}

export default ReimbursementService;