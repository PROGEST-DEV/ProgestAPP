import API from 'apiConfig';
import ProjectItem from 'interfaces/ProjectItem';

const ProjectService = {
    getAll: (searchFields?: string[], searchTerm?: string) => new Promise<ProjectItem[]>(
        (resolve, reject)=>{
            const searchParams = new URLSearchParams();
            if (searchFields && searchTerm) {
                searchFields.forEach(field => {
                    searchParams.append('searchFields', field);
                });
                searchParams.append('searchTerm', searchTerm);
            }    
            const url = `Projects?${searchParams.toString()}`;
    
            API.get(url)
                .then(res => resolve(res.data))
                .catch(err => reject(err));
        }
    ),
    get: (key: string) => new Promise<ProjectItem>(
        (resolve, reject) => {
          API.get(`Projects/${key}`)
            .then(
              res => resolve(res.data)
            )
            .catch(
              err => reject(err)
            );
        }
    ),
    create: (newProject: ProjectItem) => new Promise<any>(
        (resolve, reject) => {
            API.post('Projects', newProject)
            .then(
                res => resolve(res.data)
            )
            .catch(
                err => reject(err)
            );
        }
    ),
    edit: (key: string, editedProject: ProjectItem) => new Promise<any>(
        (resolve, reject) => {
            API.put(`Projects/${key}`, editedProject)
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
            API.delete(`Projects/${key}`)
                .then(
                    () => resolve()
                )
                .catch(
                    err => reject(err)
                );
        }
    )
}

export default ProjectService;