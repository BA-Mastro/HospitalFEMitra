
import Doctor from "./Doctor"

export default interface Department{
    departmentId?: number,
    departmentName: string,
    floorNumber: number,
    doctors?: Doctor[]
}