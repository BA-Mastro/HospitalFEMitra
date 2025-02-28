import Department from "./Department";

export default interface Doctor{
    doctor_id?: number,
    first_name: string,
    last_name: string,
    phone_number: number,
    email: string,
    specialization: string,
    department?: Department
}