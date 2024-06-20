import { db } from "../lib/db/db.server";
import InputAnimation from "../types/input-animation";

const findAllAnimations = async () => {
  return await db.animation.findMany({
    take: 20,
    select: { id: true, title: true, definition: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
};

const findAnimationById = async (animationId: string) => {
  if (!animationId) {
    throw new Error("Invalid or empty input for animation id.");
  }

  const data = await db.animation.findUnique({
    where: {
      id: animationId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      dimension: true,
      frameRate: true,
      duration: true,
      layers: true,
      totalFrames: true,
      fileSize: true,
    },
  });
  return data;
};

const findAnimationsByTitle = async (title: string) => {
  if (!title) {
    throw new Error("Invalid or empty input for animation title.");
  }

  const data = await db.animation.findMany({
    take: 20,
    where: {
      title: {
        contains: title,
      },
    },
    select: { id: true, title: true, definition: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  return data;
};

const createAnimation = async (inputAnimation: InputAnimation) => {
  const animation = await db.animation.create({
    data: { ...inputAnimation },
  });

  return animation;
};

export {
  findAllAnimations,
  findAnimationById,
  createAnimation,
  findAnimationsByTitle,
};
