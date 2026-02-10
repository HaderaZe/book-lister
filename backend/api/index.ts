import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from '../src/schema/typeDefs';
import { resolvers } from '../src/resolvers';
import { getUserFromToken } from '../src/utils/auth';
import { connectDatabase } from '../src/config/database';
import Cors from 'micro-cors';

const cors = Cors({
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  origin: '*',
});

let apolloServerHandler: any;

const getApolloServerHandler = async () => {
  if (!apolloServerHandler) {
    await connectDatabase();

    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }: any) => {
        const user = getUserFromToken(req.headers.authorization);
        return { req, user };
      },
      introspection: true,
    });

    await apolloServer.start();
    apolloServerHandler = apolloServer.createHandler({ path: '/api' });
  }
  return apolloServerHandler;
};

export default cors(async (req: any, res: any) => {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const handler = await getApolloServerHandler();
  return handler(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};