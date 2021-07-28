import { RequestStatuses } from "src/app/helpers/enums/requests-status";

export interface RequestModel {
    id?: string,
    title: string,
    userId?: string,
    consultantId?: string,
    requestStamp?: Date,
    appointmentStamp?: Date,
    resolutionStamp?: Date,
    status: RequestStatuses,
    description?: string,
    photoUrl?: string
}