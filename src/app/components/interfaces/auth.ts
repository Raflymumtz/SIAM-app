export interface User {
    id: string;
    fullName: string;
    tanggalLahir: string;
    noHp: string;
    email: string;
    password: string
}

export interface ApiResponse<T> {
    message?: string;
    data: T;
  }
