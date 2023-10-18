import API from 'apiConfig';
import ReceiptItem from 'interfaces/ReceiptItem';

const ReceiptService = {
    getAll: (searchFields?: string[], searchTerm?: string) => new Promise<ReceiptItem[]>(
        (resolve, reject)=>{
            const searchParams = new URLSearchParams();
            if (searchFields && searchTerm) {
                searchFields.forEach(field => {
                    searchParams.append('searchFields', field);
                });
                searchParams.append('searchTerm', searchTerm);
            }    
            const url = `Receipts?${searchParams.toString()}`;
    
            API.get(url)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        }
    ),
    get: (key: string) => new Promise<ReceiptItem>(
        (resolve, reject) => {
          API.get(`Receipts/${key}`)
            .then(
              res => resolve(res.data)
            )
            .catch(
              err => reject(err)
            );
        }
    ),
    create: (newReceipt: ReceiptItem) => new Promise<any>(
        (resolve, reject) => {
            API.post('Receipts', newReceipt)
            .then(
                res => resolve(res.data)
            )
            .catch(
                err => reject(err)
            );
        }
    ),
    edit: (key: string, editedReceipt: ReceiptItem) => new Promise<any>(
        (resolve, reject) => {
            API.put(`Receipts/${key}`, editedReceipt)
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
            API.delete(`Receipts/${key}`)
                .then(
                    () => resolve()
                )
                .catch(
                    err => reject(err)
                );
        }
    )
}

export default ReceiptService;