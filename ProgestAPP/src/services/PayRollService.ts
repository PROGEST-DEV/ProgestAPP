import API from 'apiConfig';
import PayRollItem from 'interfaces/PayRollItem';

const PayRollService = {
    getAll: (searchFields?: string[], searchTerm?: string) => new Promise<PayRollItem[]>(
        (resolve, reject)=>{
            const searchParams = new URLSearchParams();
            if (searchFields && searchTerm) {
                searchFields.forEach(field => {
                    searchParams.append('searchFields', field);
                });
                searchParams.append('searchTerm', searchTerm);
            }    
            const url = `PayRolls?${searchParams.toString()}`;
    
            API.get(url)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        }
    ),
    get: (key: string) => new Promise<PayRollItem>(
        (resolve, reject) => {
          API.get(`PayRolls/${key}`)
            .then(
              res => resolve(res.data)
            )
            .catch(
              err => reject(err)
            );
        }
    ),
    create: (newPayRoll: PayRollItem) => new Promise<any>(
        (resolve, reject) => {
            API.post('PayRolls', newPayRoll)
            .then(
                res => resolve(res.data)
            )
            .catch(
                err => reject(err)
            );
        }
    ),
    edit: (key: string, editedPayRoll: PayRollItem) => new Promise<any>(
        (resolve, reject) => {
            API.put(`PayRolls/${key}`, editedPayRoll)
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
            API.delete(`PayRolls/${key}`)
                .then(
                    () => resolve()
                )
                .catch(
                    err => reject(err)
                );
        }
    )
}

export default PayRollService;