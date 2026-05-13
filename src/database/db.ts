import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

//Motores soportados
type Dialect = "mysql" | "postgres";

interface DatabaseConfig {
  dialect: Dialect;
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
}

//Configuración de motores
const dbConfigurations: Record<Dialect, DatabaseConfig> = {
  mysql: {
    dialect: "mysql",
    host: process.env.MYSQL_HOST || "127.0.0.1",
    username: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_NAME || "test",
    port: parseInt(process.env.MYSQL_PORT || "3306"),
  },

  postgres: {
    dialect: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "",
    database: process.env.POSTGRES_NAME || "test",
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
  },
};

//Motor seleccionado
export const selectedEngine: Dialect =
  (process.env.DB_ENGINE as Dialect) || "mysql";

//Validación
if (!dbConfigurations[selectedEngine]) {
  throw new Error(
    `Motor de base de datos no soportado: ${selectedEngine}`
  );
}

const selectedConfig = dbConfigurations[selectedEngine];

console.log(
  `Conectando a base de datos: ${selectedEngine.toUpperCase()}`
);

//Instancia Sequelize
export const sequelize = new Sequelize(
  selectedConfig.database,
  selectedConfig.username,
  selectedConfig.password,
  {
    host: selectedConfig.host,
    port: selectedConfig.port,
    dialect: selectedConfig.dialect,

    logging:
      process.env.NODE_ENV === "development"
        ? console.log
        : false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Información de conexión
export const getDatabaseInfo = () => {
  return {
    engine: selectedEngine,
    config: selectedConfig,

    connectionString: `${selectedConfig.dialect}://${selectedConfig.username}@${selectedConfig.host}:${selectedConfig.port}/${selectedConfig.database}`,
  };
};

// Probar conexión
export const testConnection = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();

    console.log(
      `Conexión exitosa a ${selectedEngine.toUpperCase()}`
    );

    return true;
  } catch (error) {
    console.error(
      `Error de conexión a ${selectedEngine.toUpperCase()}:`,
      error
    );

    return false;
  }
};