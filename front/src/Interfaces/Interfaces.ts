export interface ILoginData {
    email: string;
    password: string;
}

export interface ILoginDataError {
    email: string;
    password?: string;
}

export interface ILogedUser {
    token: string;
    user: IUser;
}

export interface IUser {
    name: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
}

export interface IAdmin extends IUser {
    phone: number;
    address: string;
    cuit: string;
    rpa: string;
    sat: string;
}

export interface IRegisterConsortium {
    name: string;
    email: string;
    password?: string;
    phone_number: string;
    cuit: string;
    address: string;
    sat: string;
    rpa: string;
}

export interface IRegisterConsortiumError {
    name?: string;
    email?: string;
    password?: string;
    phone_number?: string;
    cuit?: string;
    adress?: string;
    sat?: string;
    rpa?: string;
}
export interface IConsortium {
    id?: string;
    suterh_key: string;
    name: string;
    cuit: string;
    street_name: string;
    building_number: number;
    zip_code: string;
    country: string;
    province: string;
    city: string;
    floors: number;
    ufs: number;
    category: number;
    first_due_day: number;
}
export interface IConsortiumError {
    id?: string;
    suterh_key?: string;
    name?: string;
    cuit?: string;
    street_name?: string;
    building_number?: number;
    zip_code?: string;
    country?: string;
    province?: string;
    city?: string;
    floors?: number;
    ufs?: number;
    category?: number;
    first_due_day?: number;
}

export interface IReviews {
    profilePic: string;
    text: string;
    author: string;
    date: string;
    rating: number;
}

export interface IReviewCardProps {
    review: IReviews;
}

export interface IUserData {
    email: string;
    exp: number;
    iat: number;
    id: string;
    roles: string[];
}

export interface Props {
    children?: React.ReactNode;
    className?: string;
}

export interface IConsortium {
    building_number: number;
    category: number;
    city: string;
    country: string;
    cuit: string;
    first_due_day: number;
    floors: number;
    id?: string;
    name: string;
    province: string;
    street_name: string;
    suterh_key: string;
    ufs: number;
    zip_code: string;
}

export interface IUFs {
    type: string;
    location: string;
    number: string;
    owner: string;
    owner_phone_number: string;
    owner_email: string;
    balance: number;
    consortium_id: string;
}
