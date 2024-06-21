// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ApolloServer } from "@apollo/server";
import {
  createAnimation,
  findAllAnimations,
  findAnimationById,
  findAnimationsByTitle,
  insertOfflineAnimations,
} from "../../apis/db.apis";

export const typeDefs = `
  type Animation {
    id: String
    title: String
    definition: String
    createdAt: String
  }

  type AnimationDetails {
    id: String
    title: String
    description: String
    dimension: String
    frameRate: Int
    duration: Int
    layers: Int
    totalFrames: Int
    fileSize: String
  }

  type DBAnimation {
    id: String
    title: String
    definition: String
    description: String
    dimension: String
    frameRate: Int
    duration: Int
    layers: Int
    totalFrames: Int
    fileSize: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getAllAnimations: [Animation]
    getAnimationById(animationId: String): AnimationDetails
    getAnimationsByTitle(title: String): [Animation]
  }

  type Mutation {
    addAnimation(animation: InputAnimation): DBAnimation
    syncAnimations(animations: [InputAnimation]): DBAnimation
  }

  input InputAnimation {
    title: String
    definition: String
    description: String
    dimension: String
    frameRate: Int
    duration: Int
    layers: Int
    totalFrames: Int
    fileSize: String
  }
`;

export const resolvers = {
  Query: {
    getAllAnimations: async () => await findAllAnimations(),
    getAnimationById: async (parent, args, context, { variableValues }) => {
      const { animationId } = variableValues;
      return await findAnimationById(animationId);
    },
    getAnimationsByTitle: async (parent, args, context, { variableValues }) => {
      const { title } = variableValues;
      return await findAnimationsByTitle(title);
    },
  },
  Mutation: {
    addAnimation: async (parent, { animation }) =>
      await createAnimation(animation),
    syncAnimations: async (parent, { animations }) =>
      await insertOfflineAnimations(animations),
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
export default apolloServer;
