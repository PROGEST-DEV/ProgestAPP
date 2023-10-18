interface ProjectItem {
    id: string;
    projectCode: string;
    name: string;
    client: string;
    requestDate: string;
    type: string;
    status: string;
    squareMeters: number;
    budget: number;
}
 
export default ProjectItem;