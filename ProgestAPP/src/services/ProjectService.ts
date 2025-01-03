import { fetchAllData, fetchDataById, addData, updateData, deleteData } from 'apiConfig'; // Funciones auxiliares para Firestore
import ProjectItem from 'interfaces/ProjectItem';

const ProjectService = {
    getAll: (searchFields?: string[], searchTerm?: string) => new Promise<ProjectItem[]>(
        async (resolve, reject) => {
            try {
                const data = await fetchAllData('Projects', { searchFields, searchTerm });
                resolve(data as ProjectItem[]);
            } catch (err) {
                reject(err);
            }
        }
    ),
    get: (key: string) => new Promise<ProjectItem>(
        async (resolve, reject) => {
            try {
                const data = await fetchDataById('Projects', key);
                resolve(data as ProjectItem);
            } catch (err) {
                reject(err);
            }
        }
    ),
    create: (newProject: ProjectItem) => new Promise<any>(
        async (resolve, reject) => {
            try {
                const data = await addData('Projects', newProject);
                resolve(data);
            } catch (err) {
                reject(err);
            }
        }
    ),
    edit: (key: string, editedProject: ProjectItem) => new Promise<any>(
        async (resolve, reject) => {
            try {
                const data = await updateData('Projects', key, editedProject);
                resolve(data);
            } catch (err) {
                reject(err);
            }
        }
    ),
    delete: (key: string) => new Promise<void>(
        async (resolve, reject) => {
            try {
                await deleteData('Projects', key);
                resolve();
            } catch (err) {
                reject(err);
            }
        }
    )
};

export default ProjectService;