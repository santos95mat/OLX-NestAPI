import { UnprocessableEntityException } from '@nestjs/common';

export const handleErrorConstraintUnique = (error: Error): never => {
  const splitedMessage = error.message.split('`');

  const errorMessage = `Entrada '${
    splitedMessage[splitedMessage.length - 2]
  }' não está respeitando a constraint UNIQUE`;

  throw new UnprocessableEntityException(errorMessage);
};
