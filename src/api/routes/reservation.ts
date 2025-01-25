import { request } from "@/api/request";

// types imports
import { Reservation, ReservationParams, AddReservationDto, UpdateReservationDto } from "../types/reservation";


// POST create user
export const getAllReservations = async (
    params?: ReservationParams
  ): Promise< Reservation[] > => {
    return request({
      url: "reservations",
      method: "get",
      params,
    });
  };

export const getReservationById = async (
    id: number | string
  ): Promise< Reservation > => {
    return request({
      url: `reservations/${id}`,
      method: "get",
    });
  };
export const getReservationsByUserId = async (
    params: {userId: number | string}
  ): Promise< Reservation[] > => {
    return request({
      url: `reservations`,
      method: "get",
      params,
    });
  };

export const addReservation = async (
    data: AddReservationDto
  ): Promise< Reservation[] > => {
    return request({
      url: "reservations",
      method: "post",
      data,
    });
  };

// POST create user
export const updateReservation = async (
    id: number | string,
    data: UpdateReservationDto
  ): Promise<Reservation> => {
    return request({
      url: `reservations/${id}`,
      method: "put",
      data,
    });
  };



// delete reservation
export const deleteReservation = async (
    id: number | string,
  ): Promise<void> => {
    return request({
      url: `users/1/reservations/${id}`,
      method: "delete",
    });
  };