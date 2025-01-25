

import { ReservationStatus, RoomType } from "@/api/enums/enums";

export interface ReservationParams {
    page?: number;
    limit?: number;
    check_in?: string;
    check_out?: string;
    reservation_status?: ReservationStatus;
    room_type?: RoomType;
    guests?: number;
    hotel_name?: string;
    userId?: string;
    hotel?: string;
    name?: string;
}

export interface ReservationFilterParams {
    check_in?: string;
    check_out?: string;
    reservation_status?: ReservationStatus;
    hotel_name?: string;
    name?: string;
}

export interface Reservation {
    check_in: string;
    check_out: string;
    reservation_status: ReservationStatus;
    room_type: RoomType;
    guests: number;
    hotel_name: string;
    id: string;
    userId: string;
    hotel: string;
    name: string;
}

export interface AddReservationDto {
    userId: string;
    hotel_name?: string;
    check_in?: string;
    check_out?: string;
    reservation_status?: ReservationStatus;
    room_type?: RoomType;
    guests?: number;
    name?: string;   // user name
}

export interface UpdateReservationDto {
    hotel?: string;
    check_in?: string;
    check_out?: string;
    reservation_status?: ReservationStatus; // user only can update status
    room_type?: RoomType;
    guests?: number;
}
