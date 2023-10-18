import API from 'apiConfig';
import MaterialRequestItem from 'interfaces/MaterialRequestItem';

const MaterialRequestService = {
    getAll: (searchFields?: string[], searchTerm?: string) => new Promise<MaterialRequestItem[]>(
        (resolve, reject)=>{
            const searchParams = new URLSearchParams();
            if (searchFields && searchTerm) {
                searchFields.forEach(field => {
                    searchParams.append('searchFields', field);
                });
                searchParams.append('searchTerm', searchTerm);
            }    
            const url = `MaterialRequests?${searchParams.toString()}`;
    
            API.get(url)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        }
    ),
    get: (key: string) => new Promise<MaterialRequestItem>(
        (resolve, reject) => {
          API.get(`MaterialRequests/${key}`)
            .then(
              res => resolve(res.data)
            )
            .catch(
              err => reject(err)
            );
        }
    ),
    create: (newMaterialRequest: MaterialRequestItem) => new Promise<any>(
        (resolve, reject) => {
            API.post('MaterialRequests', newMaterialRequest)
            .then(
                res => resolve(res.data)
            )
            .catch(
                err => reject(err)
            );
        }
    ),
    edit: (key: string, editedMaterialRequest: MaterialRequestItem) => new Promise<any>(
        (resolve, reject) => {
            API.put(`MaterialRequests/${key}`, editedMaterialRequest)
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
            API.delete(`MaterialRequests/${key}`)
                .then(
                    () => resolve()
                )
                .catch(
                    err => reject(err)
                );
        }
    )
}

export default MaterialRequestService;