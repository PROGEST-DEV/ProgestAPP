import API from 'apiConfig';
import ServiceItem from 'interfaces/ServiceItem';

const ServiceService = {
    getAll: (searchFields?: string[], searchTerm?: string) => new Promise<ServiceItem[]>(
        (resolve, reject)=>{
            const searchParams = new URLSearchParams();
            if (searchFields && searchTerm) {
                searchFields.forEach(field => {
                    searchParams.append('searchFields', field);
                });
                searchParams.append('searchTerm', searchTerm);
            }    
            const url = `Services?${searchParams.toString()}`;
    
            API.get(url)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        }
    ),
    get: (key: string) => new Promise<ServiceItem>(
        (resolve, reject) => {
          API.get(`Services/${key}`)
            .then(
              res => resolve(res.data)
            )
            .catch(
              err => reject(err)
            );
        }
    ),
    create: (newService: ServiceItem) => new Promise<any>(
        (resolve, reject) => {
            API.post('Services', newService)
            .then(
                res => resolve(res.data)
            )
            .catch(
                err => reject(err)
            );
        }
    ),
    edit: (key: string, editedService: ServiceItem) => new Promise<any>(
        (resolve, reject) => {
            API.put(`Services/${key}`, editedService)
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
            API.delete(`Services/${key}`)
                .then(
                    () => resolve()
                )
                .catch(
                    err => reject(err)
                );
        }
    )
}

export default ServiceService;