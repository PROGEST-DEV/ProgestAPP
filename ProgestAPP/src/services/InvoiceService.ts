import API from 'apiConfig';
import InvoiceItem from 'interfaces/InvoiceItem';

const InvoiceService = {
    getAll: (searchFields?: string[], searchTerm?: string) => new Promise<InvoiceItem[]>(
        (resolve, reject)=>{
            const searchParams = new URLSearchParams();
            if (searchFields && searchTerm) {
                searchFields.forEach(field => {
                    searchParams.append('searchFields', field);
                });
                searchParams.append('searchTerm', searchTerm);
            }    
            const url = `Invoices?${searchParams.toString()}`;
    
            API.get(url)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        }
    ),
    get: (key: string) => new Promise<InvoiceItem>(
        (resolve, reject) => {
          API.get(`Invoices/${key}`)
            .then(
              res => resolve(res.data)
            )
            .catch(
              err => reject(err)
            );
        }
    ),
    create: (newInvoice: InvoiceItem) => new Promise<any>(
        (resolve, reject) => {
            API.post('Invoices', newInvoice)
            .then(
                res => resolve(res.data)
            )
            .catch(
                err => reject(err)
            );
        }
    ),
    edit: (key: string, editedInvoice: InvoiceItem) => new Promise<any>(
        (resolve, reject) => {
            API.put(`Invoices/${key}`, editedInvoice)
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
            API.delete(`Invoices/${key}`)
                .then(
                    () => resolve()
                )
                .catch(
                    err => reject(err)
                );
        }
    )
}

export default InvoiceService;