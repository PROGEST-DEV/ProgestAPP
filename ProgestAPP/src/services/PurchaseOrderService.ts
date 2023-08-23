import API from 'apiConfig';
import PurchaseOrderItem from 'interfaces/PurchaseOrderItem';

const PurchaseOrderService = {
    getAll: () => new Promise<PurchaseOrderItem[]>(
        (resolve, reject)=>{
            API.get('PurchaseOrders')
            .then(
                res => resolve(res.data)
            )
            .catch(
                err => reject(err)
            )
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