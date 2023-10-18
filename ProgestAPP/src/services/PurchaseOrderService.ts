import API from 'apiConfig';
import PurchaseOrderItem from 'interfaces/PurchaseOrderItem';

const PurchaseOrderService = {
    getAll: (searchFields?: string[], searchTerm?: string) => new Promise<PurchaseOrderItem[]>(
        (resolve, reject)=>{
            const searchParams = new URLSearchParams();
            if (searchFields && searchTerm) {
                searchFields.forEach(field => {
                    searchParams.append('searchFields', field);
                });
                searchParams.append('searchTerm', searchTerm);
            }    
            const url = `PurchaseOrders?${searchParams.toString()}`;
    
            API.get(url)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        }
    ),
    get: (key: string) => new Promise<PurchaseOrderItem>(
        (resolve, reject) => {
          API.get(`PurchaseOrders/${key}`)
            .then(
              res => resolve(res.data)
            )
            .catch(
              err => reject(err)
            );
        }
    ),
    create: (newPurchaseOrder: PurchaseOrderItem) => new Promise<any>(
        (resolve, reject) => {
            API.post('PurchaseOrders', newPurchaseOrder)
            .then(
                res => resolve(res.data)
            )
            .catch(
                err => reject(err)
            );
        }
    ),
    edit: (key: string, editedPurchaseOrder: PurchaseOrderItem) => new Promise<any>(
        (resolve, reject) => {
            API.put(`PurchaseOrders/${key}`, editedPurchaseOrder)
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
            API.delete(`PurchaseOrders/${key}`)
                .then(
                    () => resolve()
                )
                .catch(
                    err => reject(err)
                );
        }
    )
}

export default PurchaseOrderService;