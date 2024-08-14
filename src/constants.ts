export const DB_NAME: string = 'insurance'


export const UserRolesEnum = {
  ACTIVE_CLIENT: "Active Client",
  INACTIVE_CLIENT: "InActive Client",
};

export const AvailableUserRoles: string[] = Object.values(UserRolesEnum);

export const UserGendersEnum = {
  MALE: "Male",
  FEMALE: "Female"
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


