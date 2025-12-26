FROM node:20-alpine

RUN apk add --no-cache bash

WORKDIR /app

COPY docker/node/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
CMD ["npm", "run", "dev"]
