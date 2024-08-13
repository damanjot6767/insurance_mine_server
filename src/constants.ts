export const DB_NAME: string = 'Insurance'


export const UserRolesEnum = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export const AvailableUserRoles: string[] = Object.values(UserRolesEnum);

export const UserGendersEnum = {
  MALE: "MALE",
  FEMALE: "FEMALE"
}

export const AvailableGenders: string[] = Object.values(UserGendersEnum)

export const cookieOptions = {
  domain:'localhost',
  path:'/',
  httpOnly: true,
  secure: false, // Adjust this based on your environment (e.g., use `true` in production with HTTPS)
};


export const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Library API",
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.ts'],
};


