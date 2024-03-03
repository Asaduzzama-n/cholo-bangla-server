import app from './app';
import config from './app/config';
import { Server } from 'http';

const port = config.port || 5000;

async function main() {
  const server: Server = app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server closed!');
      });
    }
    process.exit(1);
  };

  const unExpectedErrorHandler = (error: unknown) => {
    console.log(`🚩Unexpected Error Handler:`, error);
    exitHandler();
  };

  process.on('uncaughtException', unExpectedErrorHandler);
  process.on('unhandledRejection', unExpectedErrorHandler);
}

main();
